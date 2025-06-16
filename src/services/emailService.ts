import emailjs from '@emailjs/browser';
import { Shipment } from './shipmentService';

const isTest = process.env.NODE_ENV === 'test';
const DOMAIN = 'https://tracking-blond.vercel.app';

const checkEmailConfig = (templateType: string) => {
  const prefix = isTest ? 'TEST_' : 'REACT_APP_EMAILJS';
  const requiredVars = [
    `${prefix}_SERVICE_ID`,
    `${prefix}_${templateType.toUpperCase()}_TEMPLATE_ID`,
    `${prefix}_USER_ID`
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};

const formatPackagesForEmail = (packages: Shipment['packages']) => {
  return packages.map(pkg => {
    return `${pkg.quantity}x ${pkg.pieceType}
Description: ${pkg.description || 'N/A'}
Dimensions: ${pkg.length}cm x ${pkg.width}cm x ${pkg.height}cm
Weight: ${pkg.weight}kg`;
  }).join('\n\n');
};

export interface ShipmentPackage {
  quantity: number;
  pieceType: string;
  description: string;
  length: number;
  width: number;
  height: number;
  weight: number;
}

export interface EmailData {
  trackingNumber: string;
  shipperName: string;
  shipperEmail: string;
  receiverName: string;
  receiverEmail: string;
  origin: string;
  destination: string;
  expectedDeliveryDate: string;
  status: 'pending' | 'in_transit' | 'on_hold' | 'delivered' | 'delayed';
  currentLocation: string;
  packages?: ShipmentPackage[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendShipperEmail = async (data: EmailData) => {
  try {
    const templateData = {
      trackingNumber: data.trackingNumber,
      shipperName: data.shipperName,
      shipperEmail: data.shipperEmail,
      receiverName: data.receiverName,
      receiverEmail: data.receiverEmail,
      origin: data.origin,
      destination: data.destination,
      expectedDeliveryDate: data.expectedDeliveryDate,
      status: data.status,
      currentLocation: data.currentLocation,
      packages: data.packages || []
    };

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: data.shipperEmail,
        subject: `Tracking Number: ${data.trackingNumber}`,
        template: 'shipper',
        data: templateData
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending shipper email:', error);
    throw error;
  }
};

export const sendReceiverEmail = async (data: EmailData) => {
  try {
    const templateData = {
      trackingNumber: data.trackingNumber,
      shipperName: data.shipperName,
      shipperEmail: data.shipperEmail,
      receiverName: data.receiverName,
      receiverEmail: data.receiverEmail,
      origin: data.origin,
      destination: data.destination,
      expectedDeliveryDate: data.expectedDeliveryDate,
      status: data.status,
      currentLocation: data.currentLocation,
      packages: data.packages || []
    };

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: data.receiverEmail,
        subject: `Tracking Number: ${data.trackingNumber}`,
        template: 'receiver',
        data: templateData
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending receiver email:', error);
    throw error;
  }
};

export const sendContactFormEmail = async (data: ContactFormData) => {
  try {
    const prefix = isTest ? 'TEST_' : 'REACT_APP_EMAILJS';
    const secondaryPrefix = isTest ? 'TEST_' : 'REACT_APP_EMAILJS_SECONDARY';
    
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      reply_to: data.email,
      to_email: 'support@navista.ai'
    };
    
    const response = await emailjs.send(
      process.env[`${secondaryPrefix}_SERVICE_ID`] || '',
      process.env[`${secondaryPrefix}_CONTACT_TEMPLATE_ID`] || '',
      templateParams,
      process.env[`${secondaryPrefix}_USER_ID`] || ''
    );

    if (response.status !== 200) {
      throw new Error('Failed to send contact form email');
    }

    return response;
  } catch (error) {
    console.error('Error sending contact form email:', error);
    throw new Error('Failed to send contact form email');
  }
};