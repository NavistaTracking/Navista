import emailjs from '@emailjs/browser';

const isTest = process.env.NODE_ENV === 'test';

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

export const sendShipperEmail = async (templateParams: any) => {
  try {
    checkEmailConfig('SHIPPER');
    const prefix = isTest ? 'TEST_' : '';
    
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

export const sendReceiverEmail = async (templateParams: any) => {
  try {
    checkEmailConfig('RECEIVER');
    const prefix = isTest ? 'TEST_' : '';
    
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

export const sendContactFormEmail = async (templateParams: any) => {
  try {
    checkEmailConfig('CONTACT');
    const prefix = isTest ? 'TEST_' : '';
    
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
    await sendShipperEmail({
      to_name: 'Test Shipper',
      tracking_number: 'TEST123456',
      status: 'Test Status'
    });

    await sendReceiverEmail({
      to_name: 'Test Receiver',
      tracking_number: 'TEST123456',
      status: 'Test Status'
    });

    return true;
  } catch (error) {
    throw new Error('Failed to send test emails');
  }
}; 