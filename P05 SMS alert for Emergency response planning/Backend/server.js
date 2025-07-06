const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Emergency Weather Alert System API',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// SMS sending endpoint
app.post('/send-sms', async (req, res) => {
    try {
        const { phoneNumber, message } = req.body;
        
        // Validate input
        if (!phoneNumber || !message) {
            return res.status(400).json({ 
                error: 'Phone number and message are required',
                code: 'MISSING_PARAMETERS'
            });
        }

        // Validate phone number format (basic validation)
        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({ 
                error: 'Invalid phone number format. Use international format (e.g., +1234567890)',
                code: 'INVALID_PHONE_NUMBER'
            });
        }

        // Get Twilio credentials from environment variables
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_PHONE_NUMBER;

        // Check if Twilio credentials are configured
        if (!accountSid || !authToken || !fromNumber) {
            console.error('Twilio credentials not configured');
            return res.status(500).json({ 
                error: 'SMS service not configured. Please check server configuration.',
                code: 'SMS_NOT_CONFIGURED'
            });
        }

        // Initialize Twilio client
        const client = twilio(accountSid, authToken);

        // Send SMS
        const twilioMessage = await client.messages.create({
            body: message,
            from: fromNumber,
            to: phoneNumber,
        });

        console.log('SMS sent successfully:', {
            sid: twilioMessage.sid,
            to: phoneNumber,
            timestamp: new Date().toISOString()
        });

        res.status(200).json({ 
            message: 'SMS sent successfully',
            sid: twilioMessage.sid,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error sending SMS:', error);
        
        // Handle specific Twilio errors
        if (error.code === 21211) {
            return res.status(400).json({ 
                error: 'Invalid phone number',
                code: 'INVALID_PHONE_NUMBER'
            });
        } else if (error.code === 21608) {
            return res.status(400).json({ 
                error: 'Phone number not verified (trial account)',
                code: 'PHONE_NOT_VERIFIED'
            });
        } else if (error.code === 21614) {
            return res.status(400).json({ 
                error: 'Invalid phone number format',
                code: 'INVALID_PHONE_FORMAT'
            });
        }

        res.status(500).json({ 
            error: 'Failed to send SMS. Please try again later.',
            code: 'SMS_SEND_ERROR',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ 
        error: 'Internal server error',
        code: 'INTERNAL_ERROR'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Endpoint not found',
        code: 'NOT_FOUND'
    });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Emergency Weather Alert System API running on http://localhost:${port}`);
    console.log(`📱 SMS Service: ${process.env.TWILIO_ACCOUNT_SID ? 'Configured' : 'Not configured'}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
