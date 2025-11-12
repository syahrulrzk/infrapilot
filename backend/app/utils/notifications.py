import smtplib
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import settings

def send_email_notification(to_email: str, subject: str, message: str):
    """
    Send an email notification
    """
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = settings.EMAIL_FROM
        msg['To'] = to_email
        msg['Subject'] = subject
        
        # Add body to email
        msg.attach(MIMEText(message, 'plain'))
        
        # Create SMTP session
        server = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
        server.starttls()  # Enable security
        server.login(settings.EMAIL_USERNAME, settings.EMAIL_PASSWORD)
        
        # Send email
        text = msg.as_string()
        server.sendmail(settings.EMAIL_FROM, to_email, text)
        server.quit()
        
        return True
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return False

def send_telegram_notification(chat_id: str, message: str):
    """
    Send a Telegram notification
    """
    try:
        url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"
        payload = {
            "chat_id": chat_id,
            "text": message
        }
        response = requests.post(url, json=payload)
        return response.status_code == 200
    except Exception as e:
        print(f"Error sending Telegram message: {str(e)}")
        return False

def send_notification(user_id: int, notification_type: str, title: str, message: str, recipient: str = None):
    """
    Send a notification based on type
    """
    if notification_type == "email":
        return send_email_notification(recipient or settings.DEFAULT_EMAIL_RECIPIENT, title, message)
    elif notification_type == "telegram":
        return send_telegram_notification(recipient or settings.DEFAULT_TELEGRAM_CHAT_ID, message)
    else:
        print(f"Unknown notification type: {notification_type}")
        return False