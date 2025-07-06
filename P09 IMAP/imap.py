import imaplib
import email
import regex as re
import chardet 
import codecs
import string


imap = imaplib.IMAP4_SSL("imap.gmail.com")

username = "Gmail account" 
password = "Password"
imap.login(username, password)


for i in imap.list()[1]:
    l = i.decode().split(' "/" ')
    print(l[0] + " = " + l[1])

status, _ = imap.select('"[Gmail]/Starred"') 

status, messages = imap.search(None, 'ALL')

for num in messages[0].split()[::-1]:
    _, msg = imap.fetch(num, "(RFC822)")
    message = email.message_from_bytes(msg[0][1])

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
            content = message.get_payload(0).get_payload(decode=True)
            detected_encoding = chardet.detect(content)['encoding']
            try:
                body = content.decode(detected_encoding)
            except (UnicodeDecodeError, TypeError):
                body = content.decode('utf-8', 'ignore') 
    else:
        content = message.get_payload(decode=True)
        detected_encoding = chardet.detect(content)['encoding']
        try:
            body = content.decode(detected_encoding)
        except (UnicodeDecodeError, TypeError):
            body = content.decode('utf-8', 'ignore')  

    subject_header = message['Subject']
    decoded_subject = email.header.decode_header(subject_header)
    subject = decoded_subject[0][0]
    if isinstance(subject, bytes):
        subject = subject.decode("utf-8")

    print("\nSubject:", subject)
    print("From:", message["From"])
    print("Date:", message["Date"])

imap.logout()