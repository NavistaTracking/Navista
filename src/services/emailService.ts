import emailjs from '@emailjs/browser';

const isTest = process.env.NODE_ENV === 'test';
const DOMAIN = 'https://tracking-9agbmnqug-mishusema237s-projects.vercel.app';

const checkEmailConfig = (templateType: string) => {
  const prefix = isTest ? 'TEST_' : '';
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

export interface EmailData {
  trackingNumber: string;
  shipperName: string;
  shipperEmail: string;
  receiverName: string;
  receiverEmail: string;
  origin: string;
  destination: string;
  expectedDeliveryDate: string;
  status?: string;
  currentLocation?: string;
  packages?: Array<{
    pieceType: string;
    quantity: number;
    weight: number;
    length?: number;
    width?: number;
    height?: number;
    description?: string;
  }>;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const sendShipperEmail = async (data: EmailData) => {
  try {
    checkEmailConfig('SHIPPER');
    const prefix = isTest ? 'TEST_' : '';
    
    const templateParams = {
      to_name: data.shipperName,
      tracking_number: data.trackingNumber,
      status: data.status || 'Pending',
      origin: data.origin,
      destination: data.destination,
      expected_delivery_date: data.expectedDeliveryDate,
      current_location: data.currentLocation || data.origin,
      tracking_url: `${DOMAIN}/track/${data.trackingNumber}`,
      to_email: data.shipperEmail
    };
    
    const response = await emailjs.send(
      process.env[`${prefix}_SERVICE_ID`] || '',
      process.env[`${prefix}_SHIPPER_TEMPLATE_ID`] || '',
      templateParams,
      process.env[`${prefix}_USER_ID`] || ''
    );

    if (response.status !== 200) {
      throw new Error('Failed to send shipper email');
    }

    return response;
  } catch (error) {
    throw new Error('Failed to send shipper email');
  }
};

export const sendReceiverEmail = async (data: EmailData) => {
  try {
    checkEmailConfig('RECEIVER');
    const prefix = isTest ? 'TEST_' : '';
    
    const templateParams = {
      to_name: data.receiverName,
      tracking_number: data.trackingNumber,
      status: data.status || 'Pending',
      origin: data.origin,
      destination: data.destination,
      expected_delivery_date: data.expectedDeliveryDate,
      current_location: data.currentLocation || data.origin,
      tracking_url: `${DOMAIN}/track/${data.trackingNumber}`,
      to_email: data.receiverEmail
    };
    
    const response = await emailjs.send(
      process.env[`${prefix}_SERVICE_ID`] || '',
      process.env[`${prefix}_RECEIVER_TEMPLATE_ID`] || '',
      templateParams,
      process.env[`${prefix}_USER_ID`] || ''
    );

    if (response.status !== 200) {
      throw new Error('Failed to send receiver email');
    }

    return response;
  } catch (error) {
    throw new Error('Failed to send receiver email');
  }
};

export const sendContactFormEmail = async (data: ContactFormData) => {
  try {
    checkEmailConfig('CONTACT');
    const prefix = isTest ? 'TEST_' : '';
    
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      reply_to: data.email
    };
    
    const response = await emailjs.send(
      process.env[`${prefix}_SERVICE_ID`] || '',
      process.env[`${prefix}_CONTACT_TEMPLATE_ID`] || '',
      templateParams,
      process.env[`${prefix}_USER_ID`] || ''
    );

    if (response.status !== 200) {
      throw new Error('Failed to send contact form email');
    }

    return response;
  } catch (error) {
    throw new Error('Failed to send contact form email');
  }
};

export const sendTestEmails = async () => {
  try {
    const testData: EmailData = {
      trackingNumber: 'TEST123456',
      shipperName: 'Test Shipper',
      shipperEmail: 'test@example.com',
      receiverName: 'Test Receiver',
      receiverEmail: 'test@example.com',
      origin: 'Test Origin',
      destination: 'Test Destination',
      expectedDeliveryDate: new Date().toISOString().split('T')[0],
      status: 'Test Status',
      currentLocation: 'Test Location'
    };

    await Promise.all([
      sendShipperEmail(testData),
      sendReceiverEmail(testData)
    ]);

    return true;
  } catch (error) {
    throw new Error('Failed to send test emails');
  }
}; 