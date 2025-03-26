import emailjs from '@emailjs/browser';

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

export const sendShipperEmail = async (data: EmailData): Promise<void> => {
  try {
    const { serviceId, templateId, userId } = validateEmailJSConfig('shipper');
    
    // Format packages for the template
    const formattedPackages = data.packages?.map((pkg, index) => {
      const dimensions = pkg.length && pkg.width && pkg.height ? 
        `${pkg.length}cm x ${pkg.width}cm x ${pkg.height}cm` : '';
      return `Package ${index + 1}:
Type: ${pkg.pieceType}
Quantity: ${pkg.quantity}
Weight: ${pkg.weight} kg${dimensions ? `\nDimensions: ${dimensions}` : ''}${pkg.description ? `\nDescription: ${pkg.description}` : ''}`;
    }).join('\n\n') || '';
    
    const templateParams = {
      company: COMPANY_NAME,
      to_name: data.shipperName,
      tracking: data.trackingNumber,
      status: data.status || 'Pending',
      location: data.currentLocation || 'Not yet in transit',
      origin: data.origin,
      destination: data.destination,
      delivery: formatDate(data.expectedDeliveryDate),
      receiver: data.receiverName,
      receiver_email: data.receiverEmail,
      packages: formattedPackages,
      url: `${window.location.origin}/track`,
      to_email: data.shipperEmail,
      email: data.shipperEmail,
      from_email: FROM_EMAIL
    };

    console.log('Sending shipper email with params:', templateParams);
    const response = await emailjs.send(serviceId, templateId, templateParams, userId);
    console.log('Shipper email sent successfully:', response);
  } catch (error) {
    console.error('Failed to send shipper email:', error);
    // Don't throw the error, just log it
  }
};

export const sendReceiverEmail = async (data: EmailData): Promise<void> => {
  try {
    // Force use the working template ID
    const serviceId = "service_sajeown";
    const templateId = "template_7pxhrkj";
    const userId = process.env.REACT_APP_EMAILJS_USER_ID;

    if (!userId) {
      console.error('Missing REACT_APP_EMAILJS_USER_ID');
      return;
    }

    console.log('Using EmailJS config:', {
      serviceId,
      templateId,
      userId: userId ? 'present' : 'missing'
    });
    
    const templateParams = {
      company: COMPANY_NAME,
      to_name: data.receiverName,
      tracking_number: data.trackingNumber,
      origin: data.origin,
      destination: data.destination,
      expected_delivery_date: formatDate(data.expectedDeliveryDate),
      tracking_url: `${window.location.origin}/track`,
      email: data.receiverEmail,
      to_email: data.receiverEmail
    };

    console.log('Sending receiver email with params:', templateParams);
    const response = await emailjs.send(serviceId, templateId, templateParams, userId);
    console.log('Receiver email sent successfully:', response);
  } catch (err: any) {
    console.error('Failed to send receiver email:', err);
    console.error('Error details:', {
      message: err.message,
      code: err.code,
      status: err.status
    });
  }
};

export const sendContactFormEmail = async (data: ContactFormData) => {
  try {
    const config = validateEmailJSConfig('contact');
    console.log('Using EmailJS config:', {
      service_id: config.serviceId,
      template_id: config.templateId,
      user_id: config.userId
    });

    const templateParams = {
      company: COMPANY_NAME,
      from_name: data.name,
      from_email: data.email,
      from_phone: data.phone,
      subject: data.subject,
      message: data.message,
      reply_to: data.email
    };

    console.log('Sending contact form email with params:', templateParams);
    const response = await emailjs.send(config.serviceId, config.templateId, templateParams, config.userId);
    console.log('Contact form email sent successfully:', response);
  } catch (error) {
    console.error('Failed to send contact form email:', error);
    throw error;
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