import imapclient
import email

imap = imapclient.IMAPClient("imap.gmail.com", use_uid=True)

username = "Gmail account" 
password = "Password"

try:
    imap.login(username, password)
except Exception as e:
    print(f"Could not log in: {e}")
    exit(1)

imap.select_folder("[Gmail]/Starred", readonly=True)

messages = imap.search("ALL")

for msg_id in messages:
    msg_data = imap.fetch([msg_id], ["BODY[]"])

    for msg_id, data in msg_data.items():
        msg = email.message_from_bytes(data[b"BODY[]"])

        print(f"Message ID: {msg_id}, From: {msg['From']}")

        # Extract the payload (body)
        payload = msg.get_payload()

        if isinstance(payload, list):
            part_content_types = [part.get_content_type() for part in payload]
            print('Parts:', ' '.join(part_content_types))
        else:
            # If single part, print a preview of the payload (body)
            print(' ', ' '.join(payload[:60].split()), '...')

imap.logout()
