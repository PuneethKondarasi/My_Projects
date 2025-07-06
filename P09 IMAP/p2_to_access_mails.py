import imaplib
import email
from email.header import decode_header
import chardet

imap = imaplib.IMAP4_SSL("imap.gmail.com")

username = "Gmail account" 
password = "Password"
imap.login(username, password)

status, _ = imap.select('"[Gmail]/Starred"')

status, messages = imap.search(None, 'ALL')

for num in messages[0].split()[::-1]:
    _, msg = imap.fetch(num, "(RFC822)")
    message = email.message_from_bytes(msg[0][1])

    # Extract message body based on multipart or non-multipart content
    if message.is_multipart():
        for part in message.walk():
            if part.get_content_type() == "text/plain":
                content = part.get_payload(decode=True)
                detected_encoding = chardet.detect(content)['encoding']
                try:
                    body = content.decode(detected_encoding)
                except (UnicodeDecodeError, TypeError):
                    body = content.decode('utf-8', 'ignore')
                break
    else:
        content = message.get_payload(decode=True)
        detected_encoding = chardet.detect(content)['encoding']
        try:
            body = content.decode(detected_encoding)
        except (UnicodeDecodeError, TypeError):
            body = content.decode('utf-8', 'ignore')

    subject_header = message['Subject']
    decoded_subject = decode_header(subject_header)
    subject = decoded_subject[0][0]
    if isinstance(subject, bytes):
        subject = subject.decode("utf-8")

    print("\nSubject:", subject)
    print("From:", message["From"])
    print("Date:", message["Date"])

imap.logout()
