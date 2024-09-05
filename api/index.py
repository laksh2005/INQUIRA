from flask import Flask, request, jsonify, make_response
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId
from dotenv import load_dotenv
from utils import auth
import datetime

# load .env
load_dotenv()

app = Flask(__name__)
app.config.from_prefixed_env()
mongo = PyMongo(app)


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = auth.hash_password(data['password'])
    new_user = {
        'username': data['username'],
        'password': hashed_password
    }
    if mongo.db.users.find_one({'username': data['username']}):
        return jsonify({'message': 'Username already exists'}), 400
    mongo.db.users.insert_one(new_user)
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = mongo.db.users.find_one({'username': data['username']})
    if not user or user['password'] != auth.hash_password(data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token_expiration = datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    refresh_token_expiration = datetime.datetime.utcnow() + datetime.timedelta(days=7)

    access_token = auth.create_token(
        user['_id'],
        access_token_expiration,
        app.config['SECRET_KEY']
    )
    refresh_token = auth.create_token(
        user['_id'],
        refresh_token_expiration,
        app.config['SECRET_KEY']
    )

    response = make_response(jsonify({'access_token': access_token}))
    response.set_cookie('refresh_token', refresh_token, httponly=True, secure=True, samesite='Lax')
    return response

@app.route('/refresh', methods=['POST'])
def refresh():
    refresh_token = request.cookies.get('refresh_token')
    if not refresh_token:
        return jsonify({'message': 'Refresh token is missing'}), 401

    user_id = auth.decode_token(refresh_token, app.config['SECRET_KEY'])
    if isinstance(user_id, str):
        return jsonify({'message': user_id}), 401

    access_token_expiration = datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    access_token = auth.create_token(
        user_id,
        access_token_expiration,
        app.config['SECRET_KEY']
    )
    response = make_response(jsonify({'access_token': access_token}))
    response.set_cookie('refresh_token', '', expires = 0)
    return response

@app.route('/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'Token is missing'}), 401

    if not token.startswith('Bearer '):
        return jsonify({'message': 'Invalid token format'}), 401

    token = token.split(' ')[1]
    user_id = auth.decode_token(token, app.config['SECRET_KEY'])

    try:
        user_id = ObjectId(user_id)
    except Exception as e:
        return jsonify({'message': 'Invalid user ID format'}), 401

    user = mongo.db.users.find_one({'_id': user_id})
    if not user:
        return jsonify({'message': 'User not found'}), 401

    return jsonify({'message': f'Hello, {user["username"]}!'})

if __name__ == '__main__':
    app.run(
        host = '0.0.0.0',
        port = 8000
    )
