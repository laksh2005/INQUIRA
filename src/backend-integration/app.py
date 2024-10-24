from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  

BOT_API_URL = 'https://gailbot-v1.onrender.com/'

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    user_message = data.get('query')

    try:
        response = requests.post(BOT_API_URL, json={'message': user_message})
        bot_reply = response.json().get('reply', 'Error in bot response')
        return jsonify({'reply': bot_reply})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/upload', methods=['POST'])
def upload_files():
    files = request.files
    namespace = request.form.get('namespace')
    return jsonify({'message': 'Files received successfully', 'namespace': namespace})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 
