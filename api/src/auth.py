import hashlib
import jwt

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def create_token(user_id, expiration, jwt_key):
    token = jwt.encode(
        {
            'user_id': str(user_id),
            'exp': expiration
        },
        jwt_key,
        algorithm = 'HS256'
    )
    return token

def decode_token(token, jwt_key):
    try:
        payload = jwt.decode(
            token,
            jwt_key,
            algorithms = ['HS256']
        )
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError as e:
        return f'Invalid token. Please log in again. Error: {str(e)}'