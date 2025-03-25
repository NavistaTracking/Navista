const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  console.log('Received email request:', req.body);
  try {
    const { from, to, subject, html } = req.body;
    
    console.log('Sending email with Resend...');
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html
    });

    console.log('Email sent successfully:', data);
    res.json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

// Add a test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Resend API Key: ${process.env.RESEND_API_KEY ? 'Present' : 'Missing'}`);
}); 