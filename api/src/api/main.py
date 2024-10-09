from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from pydantic import BaseModel
from pinecone import Pinecone
from hugchat import hugchat
from hugchat.login import Login
from sentence_transformers import SentenceTransformer
from typing import List
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from dotenv import load_dotenv
import os
import uuid
import logging

load_dotenv()
app = FastAPI()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

tmp_dir = "tmp"
os.makedirs(tmp_dir, exist_ok=True)

pinecone_api_key = os.environ.get("PINECONE_API_KEY")
pc = Pinecone(api_key=pinecone_api_key)
index_name = "gailbot"

embedding_model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

def login_huggingface_session(email, password):
    sign = Login(email, password)
    cookies = sign.login(cookie_dir_path="./cookies/", save_cookies=True)
    return hugchat.ChatBot(cookies=cookies.get_dict())

chatbot = login_huggingface_session(os.environ.get("HUGGINGFACE_EMAIL"), os.environ.get("HUGGINGFACE_PASSWORD"))

def get_embedding(text: str) -> List[float]:
    return embedding_model.encode(text).tolist()

class QueryModel(BaseModel):
    namespace: str
    query: str

@app.post("/upload")
async def upload_document(namespace: str,background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    file_path = os.path.join("tmp",f"{uuid.uuid4()}_{file.filename}")

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    background_tasks.add_task(process_and_store_document, namespace, file_path)

    return {"message": "Document uploaded successfully. Processing in the background."}

async def process_and_store_document(namespace: str, file_path: str):
    try:
        loader = PyPDFLoader(file_path)
        documents = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        texts = text_splitter.split_documents(documents)

        index = pc.Index(index_name)
        data = []
        for i, text_chunk in enumerate(texts):
            embedding = get_embedding(text_chunk.page_content)
            metadata = {
                'text': text_chunk.page_content 
            }
            data.append((f"{file_path}_chunk_{i}", embedding, metadata))
        
        index.upsert(data, namespace=namespace)
        os.remove(file_path)
        logger.info(f"Document processed and indexed for namespace: {namespace}")
    except Exception as e:
        logger.error(f"Error processing document: {e}")

@app.post("/query")
async def query_documents(query: QueryModel):
    try:
        query_embedding = get_embedding(query.query)
        index = pc.Index(index_name)
        results = index.query(vector=query_embedding, top_k=5, include_metadata=True, namespace=query.namespace)

        relevant_docs = []
        for match in results.get("matches", []):
            metadata = match.get("metadata", {})
            if isinstance(metadata, dict) and 'text' in metadata:
                relevant_docs.append(metadata['text'])

        context = " ".join(relevant_docs)
        response = chatbot.chat(text=f"Context: {context} \n\nQuery: {query.query} ")
        response = response.wait_until_done()

        return {"response": response}
    except Exception as e:
        logger.error(f"Query processing failed: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while processing your query")

@app.delete("/delete_namespace/{namespace}")
async def delete_namespace(namespace: str):
    try:
        index = pc.Index(index_name)
        index.delete(namespace=namespace, delete_all=True)
        logger.info(f"Namespace '{namespace}' deleted successfully.")
        return {"message": f"Namespace '{namespace}' deleted successfully."}
    except Exception as e:
        logger.error(f"Error deleting namespace: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)