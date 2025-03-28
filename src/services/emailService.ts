import emailjs from '@emailjs/browser';

const isTest = process.env.NODE_ENV === 'test';

const COMPANY_NAME = 'Global Track';
const FROM_EMAIL = 'mishaelsema@gmail.com'; // Your Gmail address

// EmailJS endpoints
// const API_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

// Validate EmailJS configuration
const validateEmailJSConfig = (templateType: 'shipper' | 'receiver' | 'contact') => {
  console.log(`Checking EmailJS environment variables for ${templateType} template...`);
  
  let prefix;
  if (templateType === 'contact') {
    prefix = 'REACT_APP_EMAILJS_SECONDARY';
  } else {
    prefix = 'REACT_APP_EMAILJS';
  }
  
  console.log(`${prefix}_SERVICE_ID:`, process.env[`${prefix}_SERVICE_ID`]);
  console.log(`${prefix}_${templateType.toUpperCase()}_TEMPLATE_ID:`, process.env[`${prefix}_${templateType.toUpperCase()}_TEMPLATE_ID`]);
  console.log(`${prefix}_USER_ID:`, process.env[`${prefix}_USER_ID`]);

  const serviceId = process.env[`${prefix}_SERVICE_ID`];
  const templateId = process.env[`${prefix}_${templateType.toUpperCase()}_TEMPLATE_ID`];
  const userId = process.env[`${prefix}_USER_ID`];

  if (!serviceId) throw new Error(`Missing ${prefix}_SERVICE_ID`);
  if (!templateId) throw new Error(`Missing ${prefix}_${templateType.toUpperCase()}_TEMPLATE_ID`);
  if (!userId) throw new Error(`Missing ${prefix}_USER_ID`);

  return {
    serviceId,
    templateId,
    userId
  };
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

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Remove unused createShipperEmailHtml and createReceiverEmailHtml functions

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

// Test function to verify email sending
export const testEmailService = async (): Promise<boolean> => {
  try {
    // Test data
    const testData: EmailData = {
      trackingNumber: 'TEST123456',
      shipperName: 'Test Shipper',
      shipperEmail: 'mishusema@gmail.com',
      receiverName: 'Test Receiver',
      receiverEmail: 'mishusema@gmail.com',
      origin: 'Test Origin',
      destination: 'Test Destination',
      expectedDeliveryDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      currentLocation: 'Test Location',
      packages: [
        {
          pieceType: 'Box',
          quantity: 1,
          weight: 10,
          length: 10,
          width: 10,
          height: 10,
          description: 'Test Package'
        }
      ]
    };

    // Test shipper email
    console.log('Sending test shipper email...');
    await sendShipperEmail(testData);
    console.log('Shipper email sent successfully');

    // Test receiver email
    console.log('Sending test receiver email...');
    await sendReceiverEmail(testData);
    console.log('Receiver email sent successfully');

    return true;
  } catch (error) {
    console.error('Email test failed:', error);
    return false;
  }
}; 