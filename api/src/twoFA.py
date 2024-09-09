import smtplib
import pyotp
from email.mime.text import MIMEText
import os

totp = pyotp.TOTP(os.getenv("OTP_KEY"))
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")

def send_email(receiver_email, msg):
    try:
        smtp_server = smtplib.SMTP('smtp.gmail.com', 587)
        smtp_server.starttls()
        smtp_server.login(SENDER_EMAIL, SENDER_PASSWORD)
        smtp_server.sendmail(SENDER_EMAIL, receiver_email, msg.as_string())
        smtp_server.quit()
    except Exception as e:
        print(f"Error sending OTP: {e}")

def send_otp(receiver_email):
    otp_value = totp.now()

    msg = MIMEText(f"Your OTP is: {otp_value}")
    msg['Subject'] = 'Your OTP for Login'
    msg['From'] = SENDER_EMAIL
    msg['To'] = receiver_email

    send_email(receiver_email, msg)

    return otp_value
