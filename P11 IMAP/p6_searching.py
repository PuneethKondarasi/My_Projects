import getpass
from imapclient import IMAPClient

imap = IMAPClient("imap.gmail.com", ssl=True)

username = "Gmail account" 
password = "Password"

try:
    imap.login(username, password)
except Exception as e:
    print(f"Could not log in: {e}")
    exit(1)

def search_messages(imap, folder="INBOX", search_criteria="ALL"):

    # Select the folder (readonly to avoid making any changes)
    imap.select_folder(folder, readonly=True)
    
    # Perform the search
    uids = imap.search(search_criteria)
    
    # Print the UIDs of messages that match the search criteria
    print(f"Found {len(uids)} messages matching the criteria '{search_criteria}':")
    print(uids)

def search_by_flags(imap, folder="INBOX"):

    search_criteria = 'FLAGGED'
    
    search_messages(imap, folder, search_criteria)

def search_by_date(imap, folder="INBOX", date="SINCE 20-Aug-2010"):

    search_messages(imap, folder, date)

def search_by_answered(imap, folder="INBOX"):

    search_criteria = 'ANSWERED'
    search_messages(imap, folder, search_criteria)

def search_by_unread(imap, folder="INBOX"):

    search_criteria = 'UNSEEN'
    search_messages(imap, folder, search_criteria)

def search_by_larger(imap, folder="INBOX", size=50000):

    search_criteria = f'LARGER {size}'
    search_messages(imap, folder, search_criteria)

if __name__ == "__main__":
    # Search based on various criteria
    search_by_flags(imap, folder="INBOX")
    search_by_date(imap, folder="INBOX", date="SINCE 01-Aug-2024")
    
    search_by_answered(imap, folder="INBOX")
    
    search_by_unread(imap, folder="INBOX")
    
    search_by_larger(imap, folder="INBOX", size=50000)

    imap.logout()
