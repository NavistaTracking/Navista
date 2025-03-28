import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { sendShipperEmail, sendReceiverEmail, EmailData } from './emailService';

export interface TrackingDetails {
  id: string;
  trackingNumber: string;
  // Shipper Information
  shipperName: string;
  shipperAddress: string;
  shipperPhone: string;
  shipperEmail: string;
  // Receiver Information
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  receiverEmail: string;
  // Shipment Information
  origin: string;
  destination: string;
  carrier: string;
  shipmentType: string;
  shipmentMode: string;
  product: string;
  productQuantity: string;
  paymentMode: string;
  totalFreight: string;
  // Schedule
  expectedDeliveryDate: string;
  departureTime: string;
  pickupDate: string;
  pickupTime: string;
  // Package Details
  quantity: string;
  pieceType: string;
  description: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  // Comments
  comments: string;
  // Status
  status: string;
  currentLocation: string;
  lastUpdated: string;
}

export type CreateTrackingData = Omit<TrackingDetails, 'id' | 'trackingNumber' | 'lastUpdated' | 'currentLocation'>;
export type UpdateTrackingData = Partial<CreateTrackingData>;

// Generate a random tracking number
const generateTrackingNumber = (): string => {
  const prefix = 'TRK';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

// Create new tracking
export const createTracking = async (data: CreateTrackingData): Promise<{ id: string; trackingNumber: string }> => {
  try {
    const trackingNumber = generateTrackingNumber();
    const trackingRef = collection(db, 'trackings');
    const docRef = await addDoc(trackingRef, {
      ...data,
      trackingNumber,
      status: data.status || 'Pending',
      currentLocation: data.origin,
      lastUpdated: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Send emails to both shipper and receiver
    if (data.shipperEmail) {
      try {
        const emailData: EmailData = {
          trackingNumber,
          shipperName: data.shipperName,
          shipperEmail: data.shipperEmail,
          receiverName: data.receiverName,
          receiverEmail: data.receiverEmail,
          origin: data.origin,
          destination: data.destination,
          expectedDeliveryDate: data.expectedDeliveryDate,
          status: data.status || 'Pending',
          currentLocation: data.origin
        };

        await Promise.all([
          sendShipperEmail(emailData),
          sendReceiverEmail(emailData)
        ]);
      } catch (emailError) {
        console.error('Failed to send notification emails:', emailError);
        // Don't throw the error - we still want to create the tracking even if emails fail
      }
    }

    return { id: docRef.id, trackingNumber };
  } catch (error) {
    console.error('Error creating tracking:', error);
    throw error;
  }
};

// Get tracking by number
export const getTrackingByNumber = async (trackingNumber: string): Promise<TrackingDetails | null> => {
  try {
    const trackingRef = collection(db, 'trackings');
    const q = query(trackingRef, where('trackingNumber', '==', trackingNumber));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();
    const lastUpdated = data.lastUpdated ? (data.lastUpdated as Timestamp).toDate().toLocaleString() : 'N/A';

    return {
      id: doc.id,
      trackingNumber: data.trackingNumber,
      // Shipper Information
      shipperName: data.shipperName,
      shipperAddress: data.shipperAddress,
      shipperPhone: data.shipperPhone,
      shipperEmail: data.shipperEmail,
      // Receiver Information
      receiverName: data.receiverName,
      receiverAddress: data.receiverAddress,
      receiverPhone: data.receiverPhone,
      receiverEmail: data.receiverEmail,
      // Shipment Information
      origin: data.origin,
      destination: data.destination,
      carrier: data.carrier,
      shipmentType: data.shipmentType,
      shipmentMode: data.shipmentMode,
      product: data.product,
      productQuantity: data.productQuantity,
      paymentMode: data.paymentMode,
      totalFreight: data.totalFreight,
      // Schedule
      expectedDeliveryDate: data.expectedDeliveryDate,
      departureTime: data.departureTime,
      pickupDate: data.pickupDate,
      pickupTime: data.pickupTime,
      // Package Details
      quantity: data.quantity,
      pieceType: data.pieceType,
      description: data.description,
      length: data.length,
      width: data.width,
      height: data.height,
      weight: data.weight,
      // Comments
      comments: data.comments,
      // Status
      status: data.status,
      currentLocation: data.currentLocation,
      lastUpdated,
    };
  } catch (error) {
    console.error('Error getting tracking:', error);
    throw error;
  }
};

// Get all trackings
export const getAllTrackings = async (): Promise<TrackingDetails[]> => {
  try {
    const trackingRef = collection(db, 'trackings');
    const q = query(trackingRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      const lastUpdated = data.lastUpdated ? (data.lastUpdated as Timestamp).toDate().toLocaleString() : 'N/A';

      return {
        id: doc.id,
        trackingNumber: data.trackingNumber,
        // Shipper Information
        shipperName: data.shipperName,
        shipperAddress: data.shipperAddress,
        shipperPhone: data.shipperPhone,
        shipperEmail: data.shipperEmail,
        // Receiver Information
        receiverName: data.receiverName,
        receiverAddress: data.receiverAddress,
        receiverPhone: data.receiverPhone,
        receiverEmail: data.receiverEmail,
        // Shipment Information
        origin: data.origin,
        destination: data.destination,
        carrier: data.carrier,
        shipmentType: data.shipmentType,
        shipmentMode: data.shipmentMode,
        product: data.product,
        productQuantity: data.productQuantity,
        paymentMode: data.paymentMode,
        totalFreight: data.totalFreight,
        // Schedule
        expectedDeliveryDate: data.expectedDeliveryDate,
        departureTime: data.departureTime,
        pickupDate: data.pickupDate,
        pickupTime: data.pickupTime,
        // Package Details
        quantity: data.quantity,
        pieceType: data.pieceType,
        description: data.description,
        length: data.length,
        width: data.width,
        height: data.height,
        weight: data.weight,
        // Comments
        comments: data.comments,
        // Status
        status: data.status,
        currentLocation: data.currentLocation,
        lastUpdated,
      };
    });
  } catch (error) {
    console.error('Error getting all trackings:', error);
    throw error;
  }
};

// Update tracking
export const updateTracking = async (id: string, data: UpdateTrackingData): Promise<void> => {
  try {
    const trackingRef = doc(db, 'trackings', id);
    const updateData = {
      ...data,
      lastUpdated: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await updateDoc(trackingRef, updateData);

    // Send email updates if email is provided
    if (data.shipperEmail) {
      try {
        const trackingDoc = await getDoc(trackingRef);
        const trackingData = trackingDoc.data();
        
        if (trackingData) {
          const emailData: EmailData = {
            trackingNumber: trackingData.trackingNumber,
            shipperName: data.shipperName || trackingData.shipperName || '',
            shipperEmail: data.shipperEmail,
            receiverName: data.receiverName || trackingData.receiverName || '',
            receiverEmail: data.receiverEmail,
            origin: data.origin || trackingData.origin || '',
            destination: data.destination || trackingData.destination || '',
            expectedDeliveryDate: data.expectedDeliveryDate || trackingData.expectedDeliveryDate || '',
            status: data.status || trackingData.status || 'Pending',
            currentLocation: trackingData.currentLocation || ''
          };

          await Promise.all([
            sendShipperEmail(emailData),
            sendReceiverEmail(emailData)
          ]);
        }
      } catch (emailError) {
        console.error('Failed to send update notification emails:', emailError);
        // Don't throw the error - we still want to update the tracking even if emails fail
      }
    }
  } catch (error) {
    console.error('Error updating tracking:', error);
    throw error;
  }
};

// Delete tracking
export const deleteTracking = async (trackingNumber: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'trackings', trackingNumber));
  } catch (error) {
    throw new Error('Failed to delete tracking');
  }
}; 