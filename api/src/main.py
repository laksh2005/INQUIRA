from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain.chains import ConversationalRetrievalChain
from langchain_huggingface import HuggingFaceEmbeddings 
from langchain_community.llms import HuggingFacePipeline
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain_huggingface import HuggingFaceEndpoint

from pathlib import Path
import chromadb
from unidecode import unidecode
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

PUBLIC_FOLDER = 'public'
os.makedirs(PUBLIC_FOLDER, exist_ok=True)



model_name = "mistralai/Mistral-7B-Instruct-v0.2"
simple_model_name = os.path.basename(model_name)



def create_db(splits, collection_name):
    embedding = HuggingFaceEmbeddings(model_name)
    new_client = chromadb.EphemeralClient()
    vectordb = Chroma.from_documents(
        documents= splits, 
        embedding= embedding,
        client = new_client,
        collection_name = collection_name
    )
    return vectordb

def load_db():
    embeddings = HuggingFaceEmbeddings()
    vectordb = Chroma(
        embedding_function= embeddings,
    )
    return vectordb 


def initialize_llmchain(llm_model,access_token,vector_db, temperature = 0.7, max_tokens = 1024, top_k = 3):

    llm = HuggingFaceEndpoint(
        llm_model,
        access_token,
        temperature,
        max_tokens,
        top_k, 
        vector_db
    )

    memory = ConversationBufferMemory(
        memory_key = "chat_history",
        output_key = "answer",
        return_messages = True   
    )

    retriever = vector_db.as_retriever()

    qa_chain = ConversationalRetrievalChain.from_llm(
        llm,
        retriever = retriever,
        chain_type = "stuff",
        memory = memory,

        return_source_documents = True,
        verbose = False,
    )

    return qa_chain

def create_collection_name(filepath):
    # Extract filename without extension
    collection_name = Path(filepath).stem
    # Fix potential issues from naming convention
    ## Remove space
    collection_name = collection_name.replace(" ","-") 
    ## ASCII transliterations of Unicode text
    collection_name = unidecode(collection_name)
    ## Remove special characters
    collection_name = re.sub('[^A-Za-z0-9]+', '-', collection_name)
    ## Limit length to 50 characters
    collection_name = collection_name[:50]
    ## Minimum length of 3 characters
    if len(collection_name) < 3:
        collection_name = collection_name + 'xyz'
    ## Enforce start and end as alphanumeric character
    if not collection_name[0].isalnum():
        collection_name = 'A' + collection_name[1:]
    if not collection_name[-1].isalnum():
        collection_name = collection_name[:-1] + 'Z'
    print('Filepath: ', filepath)
    print('Collection name: ', collection_name)
    return collection_name



# Initialize database
def initialize_database(list_file_obj, chunk_size = 600, chunk_overlap = 40):
    # Create list of documents (when valid)
    list_file_path = [x.name for x in list_file_obj if x is not None]
    # Create collection_name for vector database
    print("Creating collection name...")
    collection_name = create_collection_name(list_file_path[0])
    print("Loading document...")
    # Load document and create splits
    doc_splits = load_doc(list_file_path, chunk_size, chunk_overlap)
    # Create or load vector database
    print("Generating vector database...")
    # global vector_db
    vector_db = create_db(doc_splits, collection_name)
    print("Done!")
    return vector_db, collection_name, "Complete!"

import gradio as gr

def initialize_LLM(llm_temperature, max_tokens, top_k, vector_db, progress=gr.Progress()):
    # print("llm_option",llm_option)
    llm_name = model_name 
    print("llm_name: ",llm_name)
    qa_chain = initialize_llmchain(llm_name, llm_temperature, max_tokens, top_k, vector_db, progress)
    return qa_chain, "Complete!"


def format_chat_history(message, chat_history):
    formatted_chat_history = []
    for user_message, bot_message in chat_history:
        formatted_chat_history.append(f"User: {user_message}")
        formatted_chat_history.append(f"Assistant: {bot_message}")
    return formatted_chat_history
    

def conversation(qa_chain, message, history):
    formatted_chat_history = format_chat_history(message, history)
    #print("formatted_chat_history",formatted_chat_history)
   
    # Generate response using QA chain
    response = qa_chain({"question": message, "chat_history": formatted_chat_history})
    response_answer = response["answer"]
    if response_answer.find("Helpful Answer:") != -1:
        response_answer = response_answer.split("Helpful Answer:")[-1]
    response_sources = response["source_documents"]
    response_source1 = response_sources[0].page_content.strip()
    response_source2 = response_sources[1].page_content.strip()
    response_source3 = response_sources[2].page_content.strip()
    # Langchain sources are zero-based
    response_source1_page = response_sources[0].metadata["page"] + 1
    response_source2_page = response_sources[1].metadata["page"] + 1
    response_source3_page = response_sources[2].metadata["page"] + 1
    # print ('chat response: ', response_answer)
    # print('DB source', response_sources)
    
    # Append user message and response to chat history
    new_history = history + [(message, response_answer)]
    # return gr.update(value=""), new_history, response_sources[0], response_sources[1] 
    return qa_chain, new_history, response_source1, response_source1_page, response_source2, response_source2_page, response_source3, response_source3_page
    


@app.route('/upload', methods=['POST'])
def upload_file():
    files = request.files
    responses = []
    try:
        form = request.form
        print(f"Form: {form}")

        accessToken = form.get("accessToken")
        print(f"Access token: {accessToken}")
        
        for key in files:
            file = files[key]
            public_path = os.path.join(PUBLIC_FOLDER, file.filename)

            # Save the file directly to the public folder
            file.save(public_path)

            # Only include files which have .pdf at the end
            # Discard the rest
            if not public_path.endswith('.pdf'):
                continue

            print(f"Public path: {public_path}")
            # Extract text from the PDF

            # Process starts here
            doc_splits = load_doc(public_path)

            initialize_database()            
            
            responses.append({
                'filename': file.filename,
                'text': text
            })
        return {'files': responses}, 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}, 500)

# Load PDF document and create doc splits
def load_doc(file_path, chunk_size=600, chunk_overlap=40):
    try:
        loader = PyPDFLoader(file_path)
        pages = loader.load()
        
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size, 
            chunk_overlap=chunk_overlap
        )
        doc_splits = text_splitter.split_documents(pages)
        return doc_splits
    except Exception as e:
        print(f"Error: {str(e)}")
        return {'error': str(e)}

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)