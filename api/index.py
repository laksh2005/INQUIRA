from flask import Flask, request, jsonify, make_response, render_template
from flask_cors import CORS
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId
from dotenv import load_dotenv
from utils import auth
from utils.twoFA import send_otp
import datetime

# load .env
load_dotenv()
app = Flask(__name__)
CORS(app)

app.config.from_prefixed_env()
mongo = PyMongo(app)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if mongo.db.users.find_one({'email': data['email']}):
        return jsonify({'message': 'Email already exists'}), 400
    
    hashed_password = auth.hash_password(data['password'])
    otp = send_otp(data['email'])
    temp_user = {
        'username': data['username'],
        'email': data['email'],
        'password': hashed_password,
        'otp': otp,
        'otp_expiry': datetime.datetime.utcnow() + datetime.timedelta(seconds=60)
    }

    if mongo.db.non_verified_users.find_one({'email': data['email']}):
        mongo.db.non_verified_users.update_one({'email': data['email']}, {'$set': temp_user})
    else:
        mongo.db.non_verified_users.insert_one(temp_user)

    return jsonify({'message': 'An OTP has been sent to your email'}), 201

@app.route('/api/verify-email', methods=['POST'])
def verifyEmail():
    data = request.get_json()
    user = mongo.db.non_verified_users.find_one({'email': data['email']})
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    print(user['otp'], data['otp'], type(user['otp']), type(data['otp']))
    if user['otp'] != data['otp']:
        return jsonify({'message': 'Invalid OTP'}), 400
    
    if user['otp_expiry'] < datetime.datetime.utcnow():
        return jsonify({'message': 'OTP expired'}), 400
    
    user = mongo.db.users.insert_one({
        'username': user['username'],
        'email': user['email'],
        'password': user['password']
    })
    mongo.db.non_verified_users.delete_one({'email': data['email']})

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

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = mongo.db.users.find_one({'email': data['email']})
    if not user or user['password'] != auth.hash_password(data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    otp = send_otp(data['email'])
    mongo.db.users.update_one({'email': data['email']}, {'$set': {'otp': otp, 'otp_expiry': datetime.datetime.utcnow() + datetime.timedelta(seconds=60)}})

    return jsonify({'message': 'An OTP has been sent to your email'}), 200

@app.route('/api/login/otp-verify', methods=['POST'])
def loginOTPVerify():
    data = request.get_json()
    user = mongo.db.users.find_one({'email': data['email']})
    if not user or user['otp'] != data['otp']:
        return jsonify({'message': 'Invalid OTP'}), 400
    
    if user['otp_expiry'] < datetime.datetime.utcnow():
        return jsonify({'message': 'OTP expired'}), 400
    
    mongo.db.users.update_one({'email': data['email']}, {'$set': {'otp': None, 'otp_expiry': None}})

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

@app.route('/api/refresh', methods=['POST'])
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

@app.route('/api/protected', methods=['GET'])
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
        use_reloader = True,
        host = '0.0.0.0',
        port = 8000,
        threaded = True
    )
