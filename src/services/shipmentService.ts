import { v4 as uuidv4 } from 'uuid';
import { sendShipperEmail, sendReceiverEmail } from './emailService';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  enableIndexedDbPersistence,
  enableMultiTabIndexedDbPersistence
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Enable offline persistence
try {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time.
      enableMultiTabIndexedDbPersistence(db);
    }
  });
} catch (err) {
  // Handle initialization errors
}

export interface ShipmentPackage {
  quantity: number;
  pieceType: string;
  description: string;
  length: number;
  width: number;
  height: number;
  weight: number;
}

export interface ShipmentHistory {
  date: string;
  time: string;
  location: string;
  status: string;
  updatedBy: string;
  remarks: string;
}

export interface Shipment {
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
  
  // Shipment Status
  status: 'pending' | 'in_transit' | 'on_hold' | 'delivered' | 'delayed';
  currentLocation: string;
  
  // Shipment Information
  origin: string;
  destination: string;
  carrier: string;
  typeOfShipment: string;
  shipmentMode: string;
  packageCount: number;
  product: string;
  productQuantity: number;
  paymentMode: string;
  totalFreight: number;
  weight: number;
  
  // Dates and Times
  expectedDeliveryDate: string;
  departureTime: string;
  pickupDate: string;
  pickupTime: string;
  
  // Package Details
  packages: ShipmentPackage[];
  totalVolumetricWeight: number;
  totalVolume: number;
  totalActualWeight: number;
  
  // History
  shipmentHistory: ShipmentHistory[];
  
  // Comments
  comments: string;
  
  // System fields
  createdAt: string;
  updatedAt: string;
}

// Generate tracking number
const generateTrackingNumber = () => {
  const prefix = 'PSE';
  const randomNum = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `${prefix}${randomNum}`;
};

// Create a new shipment
export const createShipment = async (data: Omit<Shipment, 'id' | 'trackingNumber' | 'createdAt' | 'updatedAt'>): Promise<Shipment> => {
  try {
    const now = new Date().toISOString();
    const newShipment: Omit<Shipment, 'id'> = {
      ...data,
      trackingNumber: generateTrackingNumber(),
      createdAt: now,
      updatedAt: now
    };
    
    const docRef = await addDoc(collection(db, 'shipments'), newShipment);
    const createdShipment = { id: docRef.id, ...newShipment };
    
    // Try to send notification emails
    try {
      await Promise.all([
        sendShipperEmail(createdShipment),
        sendReceiverEmail(createdShipment)
      ]);
    } catch {
      // Silently handle email errors
    }
    
    return createdShipment;
  } catch (error) {
    throw new Error('Unable to create shipment. Please check your connection and try again.');
  }
};

// Get all shipments
export const getAllShipments = async (): Promise<Shipment[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'shipments'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Shipment[];
  } catch (error) {
    return []; // Return empty array when offline or error occurs
  }
};

// Get shipment by tracking number
export const getShipmentByTracking = async (trackingNumber: string): Promise<Shipment | null> => {
  try {
    const shipmentsRef = collection(db, 'shipments');
    const q = query(shipmentsRef, where('trackingNumber', '==', trackingNumber));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Shipment;
  } catch (error) {
    throw new Error('Unable to fetch shipment. Please check your connection and try again.');
  }
};

// Get shipment by ID
export const getShipmentById = async (id: string): Promise<Shipment | null> => {
  try {
    const docRef = doc(db, 'shipments', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Shipment;
  } catch (error) {
    throw new Error('Unable to fetch shipment. Please check your connection and try again.');
  }
};

// Update shipment
export const updateShipment = async (id: string, data: Partial<Omit<Shipment, 'id' | 'trackingNumber' | 'createdAt' | 'updatedAt'>>): Promise<Shipment> => {
  try {
    const docRef = doc(db, 'shipments', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('Shipment not found');

    const updatedData = {
      ...data,
      updatedAt: new Date().toISOString()
    };

    await updateDoc(docRef, updatedData);
    return { id, ...docSnap.data(), ...updatedData } as Shipment;
  } catch (error) {
    throw new Error('Unable to update shipment. Please check your connection and try again.');
  }
};

// Delete shipment
export const deleteShipment = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'shipments', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('Shipment not found');
    
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error('Unable to delete shipment. Please check your connection and try again.');
  }
};

// Update tracking info
export const updateTrackingInfo = async (
  id: string,
  status: string,
  currentLocation: string,
  remarks?: string
): Promise<Shipment> => {
  try {
    const shipment = await getShipmentById(id);
    if (!shipment) throw new Error('Shipment not found');

    const now = new Date();
    const historyEntry = {
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString(),
      location: currentLocation,
      status: status,
      updatedBy: 'admin',
      remarks: remarks || ''
    };

    const updatedData = {
      status: status as Shipment['status'],
      currentLocation,
      shipmentHistory: [...shipment.shipmentHistory, historyEntry],
      updatedAt: now.toISOString()
    };

    const docRef = doc(db, 'shipments', id);
    await updateDoc(docRef, updatedData);
    
    return {
      ...shipment,
      ...updatedData
    };
  } catch (error) {
    throw new Error('Unable to update tracking info. Please check your connection and try again.');
  }
}; 