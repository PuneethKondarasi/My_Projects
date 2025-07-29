import imaplib

imap = imaplib.IMAP4_SSL("imap.gmail.com")

username = "Gmail account" 
password = "Password"

try:
    imap.login(username, password)
except imaplib.IMAP4.error as e:
    print(f"Could not log in: {e}")
    exit(1)

status, select_data = imap.select("INBOX", readonly=True)

if status == "OK":
    print("Folder 'INBOX' selected successfully.\n")

    # Decode the response, which is a bytes object, and split it into parts
    folder_info = select_data[0].decode()
    
    print(f"Number of messages in INBOX: {folder_info}")
else:
    print("Failed to select the INBOX folder.")

imap.logout()
