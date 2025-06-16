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
  // User Information
  createdBy: {
    userId: string;
    email: string;
    name: string;
  };
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
  status: 'pending' | 'in_transit' | 'on_hold' | 'delivered' | 'delayed';
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
export const createTracking = async (data: CreateTrackingData, user: { id: string; email: string | null; name: string }): Promise<{ id: string; trackingNumber: string }> => {
  try {
    const trackingNumber = generateTrackingNumber();
    const trackingRef = collection(db, 'trackings');
    const docRef = await addDoc(trackingRef, {
      ...data,
      trackingNumber,
      createdBy: {
        userId: user.id,
        email: user.email,
        name: user.name
      },
      status: data.status || 'Pending',
      currentLocation: data.origin,
      lastUpdated: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Create history entry
    const historyRef = collection(db, 'trackingHistory');
    await addDoc(historyRef, {
      trackingId: docRef.id,
      trackingNumber,
      action: 'created',
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      timestamp: serverTimestamp(),
      details: 'Tracking created'
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

// Get trackings for a specific user
export const getUserTrackings = async (userId: string): Promise<TrackingDetails[]> => {
  try {
    const trackingRef = collection(db, 'trackings');
    const q = query(
      trackingRef,
      where('createdBy.userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      const lastUpdated = data.lastUpdated ? (data.lastUpdated as Timestamp).toDate().toLocaleString() : 'N/A';

      return {
        id: doc.id,
        trackingNumber: data.trackingNumber,
        createdBy: data.createdBy,
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
    console.error('Error getting user trackings:', error);
    throw error;
  }
};

// Get tracking history
export const getTrackingHistory = async (trackingId: string): Promise<any[]> => {
  try {
    const historyRef = collection(db, 'trackingHistory');
    const q = query(
      historyRef,
      where('trackingId', '==', trackingId),
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp ? (data.timestamp as Timestamp).toDate().toLocaleString() : 'N/A'
      };
    });
  } catch (error) {
    console.error('Error getting tracking history:', error);
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
      // User Information
      createdBy: data.createdBy,
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
        // User Information
        createdBy: data.createdBy,
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

// Update tracking with history
export const updateTracking = async (id: string, data: UpdateTrackingData, user: { id: string; email: string | null; name: string }): Promise<void> => {
  try {
    const trackingRef = doc(db, 'trackings', id);
    const updateData = {
      ...data,
      lastUpdated: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await updateDoc(trackingRef, updateData);

    // Create history entry
    const historyRef = collection(db, 'trackingHistory');
    await addDoc(historyRef, {
      trackingId: id,
      trackingNumber: data.trackingNumber,
      action: 'updated',
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      timestamp: serverTimestamp(),
      details: 'Tracking updated',
      changes: Object.keys(data)
    });

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

// Delete tracking with history
export const deleteTracking = async (id: string, user: { id: string; email: string | null; name: string }): Promise<void> => {
  try {
    const trackingRef = doc(db, 'trackings', id);
    const trackingDoc = await getDoc(trackingRef);
    const trackingData = trackingDoc.data();

    // Create history entry before deletion
    const historyRef = collection(db, 'trackingHistory');
    await addDoc(historyRef, {
      trackingId: id,
      trackingNumber: trackingData?.trackingNumber,
      action: 'deleted',
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      timestamp: serverTimestamp(),
      details: 'Tracking deleted'
    });

    await deleteDoc(trackingRef);
  } catch (error) {
    console.error('Error deleting tracking:', error);
    throw error;
  }
}; 