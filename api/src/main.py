from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

PUBLIC_FOLDER = 'public'
os.makedirs(PUBLIC_FOLDER, exist_ok=True)




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
            text = load_doc(public_path)
            print("Successfully extracted text from the PDF")
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