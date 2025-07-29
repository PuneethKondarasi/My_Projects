import imaplib

imap = imaplib.IMAP4_SSL("imap.gmail.com")

username = "Gmail account" 
password = "Password"

imap.login(username, password)

for i in imap.list()[1]:
    l = i.decode().split(' "/" ')
    print(l[0] + " = " + l[1])
 