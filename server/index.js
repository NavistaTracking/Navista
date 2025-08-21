const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('Missing Resend API key');
    }

    const { to, subject, template, data: templateData } = req.body;

    // Generate HTML based on template type
    let html = '';
    if (template === 'shipper') {
      html = generateShipperEmailHTML(templateData);
    } else if (template === 'receiver') {
      html = generateReceiverEmailHTML(templateData);
    } else {
      throw new Error('Invalid template type');
    }

    const emailData = await resend.emails.send({
      from: 'Navista <noreply@navista.ai>',
      to: to,
      subject: subject,
      html: html
    });

    res.json({ success: true, data: emailData });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

// Generate shipper email HTML
function generateShipperEmailHTML(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          margin: 0; 
          padding: 20px;
          background-color: #f9fafb;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: #fff; 
          border-radius: 8px; 
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: #5928b1; 
          color: #fff; 
          padding: 20px; 
          text-align: center; 
          border-bottom: 4px solid #ffbe03; 
        }
        .content { padding: 30px; }
        .footer { 
          text-align: center; 
          padding: 20px; 
          background: #f8f9fa;
          border-top: 1px solid #e5e7eb;
        }
        .tracking-number { 
          font-size: 24px; 
          color: #5928b1; 
          text-align: center; 
          margin: 20px 0; 
          padding: 15px;
          background: #f8f9fa;
          border-radius: 4px;
          font-weight: bold;
        }
        .details { 
          margin: 20px 0; 
          padding: 20px; 
          background: #f8f9fa; 
          border-radius: 8px;
        }
        .highlight { 
          color: #5928b1; 
          font-weight: bold; 
        }
        .tracking-link { 
          display: inline-block; 
          padding: 12px 24px; 
          background: #5928b1; 
          color: #fff; 
          text-decoration: none; 
          border-radius: 4px;
          margin-top: 20px;
        }
        .tracking-link:hover {
          background: #4a1f9e;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Navista</h1>
          <p>Package Incoming</p>
        </div>
        <div class="content">
          <p>Dear ${data.shipperName},</p>
          <p>A package is on its way to ${data.receiverName}!</p>
          
          <div class="tracking-number">
            Tracking Number: ${data.trackingNumber}
          </div>
          
          <div class="details">
            <p><span class="highlight">From:</span> ${data.origin}</p>
            <p><span class="highlight">To:</span> ${data.destination}</p>
            <p><span class="highlight">Expected Delivery:</span> ${data.expectedDeliveryDate}</p>
          </div>
          
          <a href="https://navista.vercel.app/track/${data.trackingNumber}" class="tracking-link">Track Your Package</a>
          <p style="color: #6b7280; font-size: 14px; margin-top: 10px;">
            Simply enter your tracking number when prompted.
          </p>
        </div>
        <div class="footer">
          <p>Thank you for choosing Navista</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Generate receiver email HTML
function generateReceiverEmailHTML(data) {
  const formatPackages = (packages) => {
    if (!packages || packages.length === 0) return 'No package details available';
    return packages.map(pkg => 
      `${pkg.quantity}x ${pkg.pieceType}
Description: ${pkg.description || 'N/A'}
Dimensions: ${pkg.length}cm x ${pkg.width}cm x ${pkg.height}cm
Weight: ${pkg.weight}kg`
    ).join('\n\n');
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          margin: 0; 
          padding: 20px;
          background-color: #f9fafb;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: #fff; 
          border-radius: 8px; 
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: #5928b1; 
          color: #fff; 
          padding: 20px; 
          text-align: center; 
          border-bottom: 4px solid #ffbe03; 
        }
        .content { padding: 30px; }
        .footer { 
          text-align: center; 
          padding: 20px; 
          background: #f8f9fa;
          border-top: 1px solid #e5e7eb;
        }
        .tracking-number { 
          font-size: 24px; 
          color: #5928b1; 
          text-align: center; 
          margin: 20px 0; 
          padding: 15px;
          background: #f8f9fa;
          border-radius: 4px;
          font-weight: bold;
        }
        .details { 
          margin: 20px 0; 
          padding: 20px; 
          background: #f8f9fa; 
          border-radius: 8px;
        }
        .section-title {
          color: #5928b1;
          font-size: 18px;
          font-weight: bold;
          margin: 20px 0 10px;
          padding-bottom: 8px;
          border-bottom: 2px solid #ffbe03;
        }
        .highlight { 
          color: #5928b1; 
          font-weight: bold; 
        }
        .tracking-link { 
          display: inline-block; 
          padding: 12px 24px; 
          background: #5928b1; 
          color: #fff; 
          text-decoration: none; 
          border-radius: 4px;
          margin-top: 20px;
        }
        .tracking-link:hover {
          background: #4a1f9e;
        }
        .packages {
          white-space: pre-line;
          margin: 10px 0;
          padding: 15px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          line-height: 1.8;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Navista</h1>
          <p>Shipment Created</p>
        </div>
        <div class="content">
          <p>Dear ${data.receiverName},</p>
          <p>Your shipment has been created successfully. Here are the details:</p>
          
          <div class="tracking-number">
            ${data.trackingNumber}
          </div>
          
          <div class="details">
            <div class="section-title">Shipment Status</div>
            <p><span class="highlight">Status:</span> ${data.status}</p>
            <p><span class="highlight">Current Location:</span> ${data.currentLocation}</p>
            
            <div class="section-title">Shipping Details</div>
            <p><span class="highlight">Origin:</span> ${data.origin}</p>
            <p><span class="highlight">Destination:</span> ${data.destination}</p>
            <p><span class="highlight">Expected Delivery:</span> ${data.expectedDeliveryDate}</p>
            
            <div class="section-title">Receiver Information</div>
            <p><span class="highlight">Name:</span> ${data.receiverName}</p>
            <p><span class="highlight">Email:</span> ${data.receiverEmail}</p>
            
            <div class="section-title">Package Details</div>
            <div class="packages">${formatPackages(data.packages)}</div>
          </div>
          
          <a href="https://navista.vercel.app/track/${data.trackingNumber}" class="tracking-link">Track Your Shipment</a>
        </div>
        <div class="footer">
          <p>Thank you for choosing Navista</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Add a test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 