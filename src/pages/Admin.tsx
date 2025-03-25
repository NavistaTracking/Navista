import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  createTracking,
  getAllTrackings,
  updateTracking,
  deleteTracking,
  TrackingDetails
} from '../services/trackingService';
import { FaTrash, FaEdit, FaInbox, FaMapMarker, FaEnvelope, FaCalendar, FaSignOutAlt, FaBarcode, FaUser, FaPhone, FaHome, FaPaw, FaMoneyBillWave } from 'react-icons/fa';

const Admin: React.FC = () => {
  const [trackings, setTrackings] = useState<TrackingDetails[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Shipper Information
  const [shipperName, setShipperName] = useState('');
  const [shipperAddress, setShipperAddress] = useState('');
  const [shipperPhone, setShipperPhone] = useState('');
  const [shipperEmail, setShipperEmail] = useState('');

  // Receiver Information
  const [receiverName, setReceiverName] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');

  // Shipment Information
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [carrier, setCarrier] = useState('');
  const [shipmentType, setShipmentType] = useState('');
  const [shipmentMode, setShipmentMode] = useState('');
  const [product, setProduct] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [totalFreight, setTotalFreight] = useState('');

  // Schedule
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  // Package Details
  const [quantity, setQuantity] = useState('');
  const [pieceType, setPieceType] = useState('');
  const [description, setDescription] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  // Comments
  const [comments, setComments] = useState('');

  // Status
  const [status, setStatus] = useState('Pending');

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadTrackings();
  }, []);

  const loadTrackings = async () => {
    try {
      const data = await getAllTrackings();
      setTrackings(data);
    } catch (error) {
      console.error('Error loading trackings:', error);
      setError('Failed to load trackings');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const resetForm = () => {
    setShipperName('');
    setShipperAddress('');
    setShipperPhone('');
    setShipperEmail('');
    setReceiverName('');
    setReceiverAddress('');
    setReceiverPhone('');
    setReceiverEmail('');
    setOrigin('');
    setDestination('');
    setCarrier('');
    setShipmentType('');
    setShipmentMode('');
    setProduct('');
    setProductQuantity('');
    setPaymentMode('');
    setTotalFreight('');
    setExpectedDeliveryDate('');
    setDepartureTime('');
    setPickupDate('');
    setPickupTime('');
    setQuantity('');
    setPieceType('');
    setDescription('');
    setLength('');
    setWidth('');
    setHeight('');
    setWeight('');
    setComments('');
    setSelectedId(null);
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const trackingData = {
        shipperName,
        shipperAddress,
        shipperPhone,
        shipperEmail,
        receiverName,
        receiverAddress,
        receiverPhone,
        receiverEmail,
        origin,
        destination,
        carrier,
        shipmentType,
        shipmentMode,
        product,
        productQuantity,
        paymentMode,
        totalFreight,
        expectedDeliveryDate,
        departureTime,
        pickupDate,
        pickupTime,
        quantity,
        pieceType,
        description,
        length,
        width,
        height,
        weight,
        comments,
        status
      };

      if (isEditing && selectedId) {
        await updateTracking(selectedId, trackingData);
        setSuccess('Tracking updated successfully');
      } else {
        await createTracking(trackingData);
        setSuccess('Tracking created successfully');
      }

      resetForm();
      loadTrackings();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to save tracking information');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tracking: TrackingDetails) => {
    setSelectedId(tracking.id);
    setShipperName(tracking.shipperName || '');
    setShipperAddress(tracking.shipperAddress || '');
    setShipperPhone(tracking.shipperPhone || '');
    setShipperEmail(tracking.shipperEmail || '');
    setReceiverName(tracking.receiverName || '');
    setReceiverAddress(tracking.receiverAddress || '');
    setReceiverPhone(tracking.receiverPhone || '');
    setReceiverEmail(tracking.receiverEmail || '');
    setOrigin(tracking.origin || '');
    setDestination(tracking.destination || '');
    setCarrier(tracking.carrier || '');
    setShipmentType(tracking.shipmentType || '');
    setShipmentMode(tracking.shipmentMode || '');
    setProduct(tracking.product || '');
    setProductQuantity(tracking.productQuantity || '');
    setPaymentMode(tracking.paymentMode || '');
    setTotalFreight(tracking.totalFreight || '');
    setExpectedDeliveryDate(tracking.expectedDeliveryDate || '');
    setDepartureTime(tracking.departureTime || '');
    setPickupDate(tracking.pickupDate || '');
    setPickupTime(tracking.pickupTime || '');
    setQuantity(tracking.quantity || '');
    setPieceType(tracking.pieceType || '');
    setDescription(tracking.description || '');
    setLength(tracking.length || '');
    setWidth(tracking.width || '');
    setHeight(tracking.height || '');
    setWeight(tracking.weight || '');
    setComments(tracking.comments || '');
    setStatus(tracking.status || 'Pending');
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tracking?')) {
      try {
        await deleteTracking(id);
        const updatedTrackings = await getAllTrackings();
        setTrackings(updatedTrackings);
        setSuccess('Tracking deleted successfully');
      } catch (error) {
        console.error('Error deleting tracking:', error);
        setError('Failed to delete tracking');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaSignOutAlt className="mr-2" size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditing ? 'Edit Shipment' : 'Create New Shipment'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipper Information Section */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipper Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Shipper Name</label>
                      <input
                        type="text"
                        required
                      value={shipperName}
                      onChange={(e) => setShipperName(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Shipper Address</label>
                      <input
                      type="text"
                        required
                      value={shipperAddress}
                      onChange={(e) => setShipperAddress(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Shipper Phone</label>
                      <input
                      type="tel"
                        required
                      value={shipperPhone}
                      onChange={(e) => setShipperPhone(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Shipper Email</label>
                      <input
                      type="email"
                        required
                      value={shipperEmail}
                      onChange={(e) => setShipperEmail(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Receiver Information Section */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Receiver Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Receiver Name</label>
                      <input
                        type="text"
                        required
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Receiver Address</label>
                      <input
                        type="text"
                        required
                      value={receiverAddress}
                      onChange={(e) => setReceiverAddress(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Receiver Phone</label>
                    <input
                      type="tel"
                      required
                      value={receiverPhone}
                      onChange={(e) => setReceiverPhone(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Receiver Email</label>
                      <input
                      type="email"
                        required
                      value={receiverEmail}
                      onChange={(e) => setReceiverEmail(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                  </div>
                </div>
              </div>

              {/* Shipment Information Section */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipment Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Origin</label>
                      <input
                        type="text"
                        required
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Destination</label>
                      <input
                      type="text"
                        required
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Carrier</label>
                      <input
                      type="text"
                        required
                      value={carrier}
                      onChange={(e) => setCarrier(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type of Shipment</label>
                    <select
                      required
                      value={shipmentType}
                      onChange={(e) => setShipmentType(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select Type</option>
                      <option value="Express">Express</option>
                      <option value="Standard">Standard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Shipment Mode</label>
                    <select
                      required
                      value={shipmentMode}
                      onChange={(e) => setShipmentMode(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select Mode</option>
                      <option value="Air Shipping">Air Shipping</option>
                      <option value="Sea Shipping">Sea Shipping</option>
                      <option value="Land Shipping">Land Shipping</option>
                    </select>
                      </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Product</label>
                      <input
                        type="text"
                        required
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Product Quantity</label>
                    <input
                      type="number"
                      required
                      value={productQuantity}
                      onChange={(e) => setProductQuantity(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
                    <select
                      required
                      value={paymentMode}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select Payment Mode</option>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Freight</label>
                    <input
                      type="number"
                      required
                      value={totalFreight}
                      onChange={(e) => setTotalFreight(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule Section */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expected Delivery Date</label>
                      <input
                        type="date"
                        required
                      value={expectedDeliveryDate}
                      onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Departure Time</label>
                      <input
                        type="time"
                        required
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pick-up Date</label>
                    <input
                      type="date"
                      required
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pick-up Time</label>
                    <input
                      type="time"
                      required
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                    </div>
                  </div>

              {/* Package Details Section */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Package Details</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="number"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Piece Type</label>
                    <select
                      required
                      value={pieceType}
                      onChange={(e) => setPieceType(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select Type</option>
                      <option value="Crate">Crate</option>
                      <option value="Box">Box</option>
                      <option value="Pallet">Pallet</option>
                    </select>
                      </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                      <input
                        type="text"
                        required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Length (cm)</label>
                    <input
                      type="number"
                      required
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Width (cm)</label>
                      <input
                      type="number"
                        required
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                    <input
                      type="number"
                      required
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                      <input
                      type="number"
                        required
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Comments</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Additional Comments</label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

              {/* Status Section */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Status</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Status</label>
                    <select
                        required
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Update'
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-4 text-red-600 text-sm">{error}</div>
            )}
            {success && (
              <div className="mt-4 text-green-600 text-sm">{success}</div>
            )}

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">All Trackings</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {trackings.map((tracking) => (
                      <tr key={tracking.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tracking.trackingNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tracking.shipperName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tracking.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(tracking)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <FaEdit className="h-5 w-5" size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(tracking.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash className="h-5 w-5" size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 