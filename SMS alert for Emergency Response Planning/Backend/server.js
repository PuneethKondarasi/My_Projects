const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, your server is running!');
});

app.post('/send-sms', (req, res) => {
    const { phoneNumber, message } = req.body;
    
    if (!phoneNumber || !message) {
        return res.status(400).json({ error: 'Phone number and message are required' });
    }

    const accountSid = 'Your Account SID';
    const authToken = 'Your Auth Token';
    const client = twilio(accountSid, authToken);

    client.messages.create({
        body: message,
        from: 'Your Twilio phone number', 
        to: phoneNumber,
    })
    .then(message => {
        console.log('Message sent successfully:', message.sid);
        res.status(200).json({ message: 'Message sent', sid: message.sid });
    })
    .catch(error => {
        console.error('Error sending message:', error);
        res.status(500).json({ error: error.message });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
