import smtplib
import pyotp
from email.mime.text import MIMEText

key = "base32secret3232"

totp = pyotp.TOTP(key)
otp_value = totp.now()
print(otp_value)

user_email = 'bhawnaagg48@gmail.com'  # Replace with the user's email address

# Create the email message
msg = MIMEText(f"Your OTP is: {otp_value}")
msg['Subject'] = 'Your OTP for Login'
msg['From'] = 'aggarwalraghav864@gmail.com'  # Replace with your email address
msg['To'] = user_email

# Send the email
try:
    smtp_server = smtplib.SMTP('smtp.gmail.com', 587)  # Replace with your SMTP server details
    smtp_server.starttls()
    smtp_server.login('aggarwalraghav864@gmail.com', 'vlwy qwnq prhk hvlm')  # Replace with your email credentials
    smtp_server.sendmail('aggarwalraghav864@gmail.com', [user_email], msg.as_string())
    smtp_server.quit()
    print(f"OTP sent to {user_email}")
except Exception as e:
    print(f"Error sending OTP: {e}")
