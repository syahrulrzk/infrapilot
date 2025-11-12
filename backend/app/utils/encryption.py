from cryptography.fernet import Fernet
from app.core.config import settings
import base64
import os

def get_cipher():
    """Create a Fernet cipher instance with the encryption key from settings"""
    # Ensure the key is 32 url-safe base64-encoded bytes
    key = settings.ENCRYPTION_KEY
    if len(key) != 32:
        # Pad or truncate the key to 32 bytes
        key = (key * ((32 // len(key)) + 1))[:32]
    encoded_key = base64.urlsafe_b64encode(key.encode())
    return Fernet(encoded_key)

def encrypt_data(data: str) -> str:
    """Encrypt a string and return the base64 encoded result"""
    if not data:
        return ""
    cipher = get_cipher()
    encrypted_data = cipher.encrypt(data.encode())
    return base64.urlsafe_b64encode(encrypted_data).decode()

def decrypt_data(encrypted_data: str) -> str:
    """Decrypt a base64 encoded string"""
    if not encrypted_data:
        return ""
    try:
        cipher = get_cipher()
        decoded_data = base64.urlsafe_b64decode(encrypted_data.encode())
        decrypted_data = cipher.decrypt(decoded_data)
        return decrypted_data.decode()
    except Exception:
        # If decryption fails, return the original data
        return encrypted_data