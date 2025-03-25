import React, { useState, useEffect, useRef } from 'react';
import { getShipmentByTracking, Shipment } from '../services/shipmentService';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'react-toastify';
import {
  FaSearch,
  FaBox,
  FaTruck,
  FaWarehouse,
  FaShippingFast,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaBoxOpen,
  FaWeightHanging,
  FaRuler,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPauseCircle,
  FaGlobe,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaPlane,
  FaShip,
  FaTruckLoading,
  FaHandshake,
  FaHeadset,
  FaSpinner,
  FaFileAlt,
  FaCreditCard,
  FaDollarSign,
} from 'react-icons/fa';
import Icon from '../components/icons/Icon';
import AnimatedCard from '../components/animations/AnimatedCard';

const Track: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const formatText = (text: string) => {
    return text
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      toast.error('Please enter a tracking number');
      return;
    }

    setLoading(true);
    setError(null);
    setShipment(null);

    try {
      const data = await getShipmentByTracking(trackingNumber);
      setShipment(data);
      // Scroll to results after a short delay to ensure the content is rendered
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      setError('Shipment not found. Please check your tracking number and try again.');
      toast.error('Shipment not found');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    if (isDarkMode) {
      switch (status.toLowerCase()) {
        case 'delivered':
          return 'text-green-400';
        case 'in_transit':
          return 'text-blue-400';
        case 'delayed':
          return 'text-red-400';
        case 'on_hold':
          return 'text-yellow-400';
        default:
          return 'text-gray-400';
      }
    } else {
      switch (status.toLowerCase()) {
        case 'delivered':
          return 'text-green-600';
        case 'in_transit':
          return 'text-blue-600';
        case 'delayed':
          return 'text-red-600';
        case 'on_hold':
          return 'text-yellow-600';
        default:
          return 'text-gray-600';
      }
    }
  };

  const getStatusIcon = (status: string) => {
    const colorClass = isDarkMode ? {
      delivered: 'text-green-400',
      in_transit: 'text-blue-400',
      delayed: 'text-red-400',
      on_hold: 'text-yellow-400',
      default: 'text-gray-400'
    } : {
      delivered: 'text-green-600',
      in_transit: 'text-blue-600',
      delayed: 'text-red-600',
      on_hold: 'text-yellow-600',
      default: 'text-gray-600'
    };

    switch (status.toLowerCase()) {
      case 'delivered':
        return <FaCheckCircle className={`text-2xl ${colorClass.delivered}`} />;
      case 'in_transit':
        return <FaTruck className={`text-2xl ${colorClass.in_transit}`} />;
      case 'delayed':
        return <FaExclamationTriangle className={`text-2xl ${colorClass.delayed}`} />;
      case 'on_hold':
        return <FaPauseCircle className={`text-2xl ${colorClass.on_hold}`} />;
      default:
        return <FaBox className={`text-2xl ${colorClass.default}`} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-[#351c15] dark:bg-gray-800 py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Digital tracking interface"
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Track Your Shipment
          </h1>
          <p className="mt-6 text-xl text-gray-300 dark:text-gray-200 max-w-3xl mx-auto">
            Real-time tracking and updates for your shipments across the globe.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tracking Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleTrack} className="space-y-6">
            <div>
              <label htmlFor="tracking" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter Tracking Number
              </label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    id="tracking"
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="e.g., PSE123456789"
                    className={`w-full px-6 py-4 text-lg rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-[#ffbe03] dark:focus:ring-[#ffbe03]`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-8 py-4 text-lg rounded-lg font-medium ${
                    isDarkMode 
                      ? 'text-gray-900 bg-[#ffbe03] hover:bg-[#e6a902] disabled:bg-gray-600' 
                      : 'text-white bg-[#351c15] hover:bg-[#4a2a1f] disabled:bg-gray-400'
                  }`}
                >
                  {loading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    'Track'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Tracking Results */}
        <div ref={resultsRef}>
          {error && (
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {shipment && (
            <div className="space-y-8">
              {/* Status Card */}
              <AnimatedCard animation="fade" delay="0ms">
                <div className={`p-8 rounded-lg shadow-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-3xl font-bold ${
                      isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'
                    }`}>
                      Shipment Status
                    </h2>
                    <span className={`px-4 py-2 rounded-full text-base font-medium ${
                      shipment.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400' :
                      shipment.status === 'in_transit' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400' :
                      shipment.status === 'delayed' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400' :
                      shipment.status === 'on_hold' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400'
                    }`}>
                      {shipment.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon icon={FaMapMarkerAlt} size={24} className="text-[#351c15] dark:text-[#ffbe03] mr-4" />
                      <div>
                        <p className="text-base text-gray-500 dark:text-gray-400">Current Location</p>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">{shipment.currentLocation}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Icon icon={FaCalendarAlt} size={24} className="text-[#351c15] dark:text-[#ffbe03] mr-4" />
                      <div className="text-right">
                        <p className="text-base text-gray-500 dark:text-gray-400">Expected Delivery</p>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">{shipment.expectedDeliveryDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Shipment Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Shipper Information */}
                <AnimatedCard animation="slide" delay="200ms">
                  <div className={`p-6 rounded-lg shadow-lg ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${
                      isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'
                    }`}>
                      Shipper Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Icon icon={FaUser} size={20} className="text-[#351c15] dark:text-[#ffbe03] mr-3" />
                        <span className="text-base text-gray-900 dark:text-gray-100">{shipment.shipperName}</span>
                      </div>
                      <div className="flex items-center">
                        <Icon icon={FaMapMarkerAlt} size={20} className="text-[#351c15] dark:text-[#ffbe03] mr-3" />
                        <span className="text-base text-gray-900 dark:text-gray-100">{shipment.shipperAddress}</span>
                      </div>
                      <div className="flex items-center">
                        <Icon icon={FaPhone} size={20} className="text-[#351c15] dark:text-[#ffbe03] mr-3" />
                        <span className="text-base text-gray-900 dark:text-gray-100">{shipment.shipperPhone}</span>
                      </div>
                      <div className="flex items-center">
                        <Icon icon={FaEnvelope} size={20} className="text-[#351c15] dark:text-[#ffbe03] mr-3" />
                        <span className="text-base text-gray-900 dark:text-gray-100">{shipment.shipperEmail}</span>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>

                {/* Receiver Information */}
                <AnimatedCard animation="slide" delay="400ms">
                  <div className={`p-6 rounded-lg shadow-lg ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${
                      isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'
                    }`}>
                      Receiver Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Icon icon={FaUser} size={20} className="text-[#351c15] dark:text-[#ffbe03] mr-3" />
                        <span className="text-base text-gray-900 dark:text-gray-100">{shipment.receiverName}</span>
                      </div>
                      <div className="flex items-center">
                        <Icon icon={FaMapMarkerAlt} size={20} className="text-[#351c15] dark:text-[#ffbe03] mr-3" />
                        <span className="text-base text-gray-900 dark:text-gray-100">{shipment.receiverAddress}</span>
                      </div>
                      <div className="flex items-center">
                        <Icon icon={FaPhone} size={20} className="text-[#351c15] dark:text-[#ffbe03] mr-3" />
                        <span className="text-base text-gray-900 dark:text-gray-100">{shipment.receiverPhone}</span>
                      </div>
                      <div className="flex items-center">
                        <Icon icon={FaEnvelope} size={20} className="text-[#351c15] dark:text-[#ffbe03] mr-3" />
                        <span className="text-base text-gray-900 dark:text-gray-100">{shipment.receiverEmail}</span>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </div>

              {/* Shipment Details - Now on its own line */}
              <AnimatedCard animation="slide" delay="600ms">
                <div className={`p-6 rounded-lg shadow-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <h3 className={`text-xl font-semibold mb-4 ${
                    isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'
                  }`}>
                    Shipment Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Origin and Destination */}
                    <div className="flex items-center">
                      <Icon icon={FaMapMarkerAlt} size={20} className="text-[#351c15] dark:text-[#ffbe03] mr-3" />
                      <span className="text-base text-gray-900 dark:text-gray-100">From: {shipment.origin} → To: {shipment.destination}</span>
                    </div>
                    
                    {/* Carrier and Type */}
                    <div className="flex items-center">
                      <Icon icon={FaTruck} size={20} className="text-[#351c15] dark:text-[#ffbe03] mr-3" />
                      <span className="text-base text-gray-900 dark:text-gray-100">Carrier: {shipment.carrier}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon icon={FaBox} size={20} className="text-[#351c15] dark:text-[#ffbe03] mr-3" />
                      <span className="text-base text-gray-900 dark:text-gray-100">Type: {formatText(shipment.typeOfShipment)}</span>
                    </div>

                    {/* Shipment Mode */}
                    <div className="flex items-center">
                      <Icon 
                        icon={
                          shipment.shipmentMode.toLowerCase().includes('air') ? FaPlane :
                          shipment.shipmentMode.toLowerCase().includes('sea') ? FaShip :
                          FaTruck
                        } 
                        size={20} 
                        className="text-[#351c15] dark:text-[#ffbe03] mr-3" 
                      />
                      <span className="text-base text-gray-900 dark:text-gray-100">{shipment.shipmentMode}</span>
                    </div>

                    {/* Payment and Freight */}
                    <div className="flex items-center">
                      <Icon icon={FaCreditCard} size={20} className="text-[#351c15] dark:text-[#ffbe03] mr-3" />
                      <span className="text-base text-gray-900 dark:text-gray-100">Payment: {formatText(shipment.paymentMode)}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon icon={FaDollarSign} size={20} className="text-[#351c15] dark:text-[#ffbe03] mr-3" />
                      <span className="text-base text-gray-900 dark:text-gray-100">Total Freight: ${shipment.totalFreight}</span>
                    </div>

                    {/* Dates and Times */}
                    <div className="flex items-center">
                      <Icon icon={FaCalendarAlt} size={20} className="text-[#351c15] dark:text-[#ffbe03] mr-3" />
                      <span className="text-base text-gray-900 dark:text-gray-100">Pickup: {shipment.pickupDate} {shipment.pickupTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon icon={FaClock} size={20} className="text-[#351c15] dark:text-[#ffbe03] mr-3" />
                      <span className="text-base text-gray-900 dark:text-gray-100">Departure: {shipment.departureTime}</span>
                    </div>
                  </div>

                  {/* Package Details */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className={`text-lg font-semibold mb-4 ${
                      isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'
                    }`}>
                      Package Details
                    </h4>
                    <div className="space-y-6">
                      {shipment.packages && shipment.packages.map((pkg, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-base font-medium text-gray-900 dark:text-white">Package {index + 1}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Quantity: {pkg.quantity}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Icon icon={FaBox} size={16} className="text-[#351c15] dark:text-[#ffbe03] mr-2" />
                              <span className="text-sm text-gray-900 dark:text-gray-100">Type: {pkg.pieceType}</span>
                            </div>
                            <div className="flex items-center">
                              <Icon icon={FaWeightHanging} size={16} className="text-[#351c15] dark:text-[#ffbe03] mr-2" />
                              <span className="text-sm text-gray-900 dark:text-gray-100">Weight: {pkg.weight} kg</span>
                            </div>
                            <div className="flex items-center">
                              <Icon icon={FaRuler} size={16} className="text-[#351c15] dark:text-[#ffbe03] mr-2" />
                              <span className="text-sm text-gray-900 dark:text-gray-100">Dimensions: {pkg.length}cm x {pkg.width}cm x {pkg.height}cm</span>
                            </div>
                            {pkg.description && (
                              <div className="flex items-start">
                                <Icon icon={FaFileAlt} size={16} className="text-[#351c15] dark:text-[#ffbe03] mr-2 mt-1" />
                                <span className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-line">{pkg.description}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Tracking History */}
              <AnimatedCard animation="slide" delay="800ms">
                <div className={`p-8 rounded-lg shadow-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <h3 className={`text-2xl font-semibold mb-6 ${
                    isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'
                  }`}>
                    Tracking History
                  </h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="space-y-8">
                      {shipment.shipmentHistory.map((history, index) => (
                        <div key={index} className="relative pl-12">
                          <div className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white'
                          }`}>
                            {getStatusIcon(history.status)}
                          </div>
                          <div className={`p-6 rounded-lg ${
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                          }`}>
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <p className={`text-lg font-medium ${
                                  isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'
                                }`}>
                                  {history.status.replace('_', ' ').toUpperCase()}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {history.date} {history.time}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-base font-medium text-gray-900 dark:text-white">{history.location}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {history.status === 'delivered' ? 'Package delivered successfully' : 
                                   history.status === 'in_transit' ? 'Package in transit' :
                                   history.status === 'delayed' ? 'Delivery delayed' :
                                   history.status === 'on_hold' ? 'Package on hold' :
                                   'Package received'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Tracking Features</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Everything you need to monitor your shipments
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatedCard animation="slide" delay="0ms">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                  <Icon icon={FaMapMarkerAlt} size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Real-Time Location</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Track your shipment's exact location with GPS precision.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="slide" delay="200ms">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                  <Icon icon={FaBox} size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Status Updates</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Get instant notifications about your shipment's status.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="slide" delay="400ms">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                  <Icon icon={FaTruck} size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Delivery Estimates</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Accurate delivery time estimates based on current location.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#351c15] dark:bg-[#1a0e0a]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:py-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Need Help?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-300 dark:text-gray-200">
                Our customer service team is available 24/7 to assist you with any tracking inquiries.
              </p>
              <div className="mt-8">
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#351c15] dark:text-[#1a0e0a] bg-white hover:bg-gray-100 dark:bg-[#ffbe03] dark:hover:bg-[#e6a902]"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track; 