from imapclient import IMAPClient

imap = IMAPClient("imap.gmail.com", ssl=True)

username = "Gmail account" 
password = "Password"


try:
    imap.login(username, password)
except Exception as e:
    print(f"Could not log in: {e}")
    exit(1)

def view_flags(imap, folder="INBOX"):

    # Select the folder (Starred folder in this case)
    imap.select_folder(folder, readonly=True)
    
    # Get the UIDs of all messages in the folder
    message_uids = imap.search('ALL')
    
    # For each message UID, fetch and display its flags
    for uid in message_uids:
        flags = imap.get_flags(uid)
        print(f"Flags for message UID {uid}: {flags[uid]}")

if __name__ == "__main__":
    view_flags(imap, folder="[Gmail]/Starred")

imap.logout()
