import requests
from app.core.config import settings

class TelegramBot:
    def __init__(self):
        self.token = settings.TELEGRAM_BOT_TOKEN
        self.base_url = f"https://api.telegram.org/bot{self.token}"
    
    def send_message(self, chat_id: str, message: str):
        """Send a message to a Telegram chat"""
        try:
            url = f"{self.base_url}/sendMessage"
            payload = {
                "chat_id": chat_id,
                "text": message
            }
            response = requests.post(url, json=payload)
            return response.json()
        except Exception as e:
            print(f"Error sending Telegram message: {str(e)}")
            return None
    
    def send_alert(self, chat_id: str, title: str, message: str):
        """Send an alert message with formatting"""
        formatted_message = f"🚨 *{title}*\n\n{message}"
        return self.send_message(chat_id, formatted_message)
    
    def send_notification(self, chat_id: str, title: str, message: str):
        """Send a notification message with formatting"""
        formatted_message = f"ℹ️ *{title}*\n\n{message}"
        return self.send_message(chat_id, formatted_message)

# Create a global instance
telegram_bot = TelegramBot()