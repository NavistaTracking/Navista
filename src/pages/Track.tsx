import React, { useState, useRef } from 'react';
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
  FaCreditCard,
  FaDollarSign,
  FaBolt,
  FaWineGlass,
  FaUniversity,
  FaPaypal,
} from 'react-icons/fa';
import AnimatedCard from '../components/animations/AnimatedCard';

const Track: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useTheme();

  const getIconColor = () => {
    return isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]';
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      toast.error('Please enter a tracking number');
      return;
    }

    try {
      setLoading(true);
      const data = await getShipmentByTracking(trackingNumber);
      if (data) {
        setShipment(data);
        toast.success('Shipment found!');
      } else {
        toast.error('No shipment found with this tracking number');
        setShipment(null);
      }
    } catch (error) {
      toast.error('Failed to fetch shipment details');
      console.error(error);
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

  const getCarrierIcon = (carrier: string) => {
    const carrierLower = carrier.toLowerCase();
    const iconColor = getIconColor();
    switch (carrierLower) {
      case 'dhl':
        return <FaTruck className={iconColor} />;
      case 'fedex':
        return <FaPlane className={iconColor} />;
      case 'ups':
        return <FaTruck className={iconColor} />;
      default:
        return <FaBox className={iconColor} />;
    }
  };

  const getShipmentModeIcon = (mode: string) => {
    const modeLower = mode.toLowerCase();
    const iconColor = getIconColor();
    switch (modeLower) {
      case 'air shipping':
      case 'air':
        return <FaPlane className={iconColor} />;
      case 'sea shipping':
      case 'sea':
        return <FaShip className={iconColor} />;
      case 'road shipping':
      case 'road':
        return <FaTruck className={iconColor} />;
      default:
        return <FaTruck className={iconColor} />;
    }
  };

  const getPaymentIcon = (paymentMode: string) => {
    const paymentLower = paymentMode.toLowerCase();
    const iconColor = getIconColor();
    switch (paymentLower) {
      case 'credit card':
        return <FaCreditCard className={iconColor} />;
      case 'cash':
        return <FaDollarSign className={iconColor} />;
      case 'bank transfer':
      case 'bank':
        return <FaUniversity className={iconColor} />;
      case 'paypal':
        return <FaPaypal className={iconColor} />;
      default:
        return <FaCreditCard className={iconColor} />;
    }
  };

  const getTypeIcon = (type: string) => {
    const typeLower = type.toLowerCase();
    const iconColor = getIconColor();
    switch (typeLower) {
      case 'standard':
        return <FaBox className={iconColor} />;
      case 'express':
        return <FaBolt className={iconColor} />;
      case 'fragile':
        return <FaWineGlass className={iconColor} />;
      case 'heavy':
        return <FaWeightHanging className={iconColor} />;
      default:
        return <FaBox className={iconColor} />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section with Tracking */}
      <div className="relative bg-[#351c15] dark:bg-gray-800 py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Track shipment"
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Track Your Shipment
          </h1>
          <p className="mt-6 text-xl text-gray-300 dark:text-gray-200 max-w-3xl mx-auto">
            Enter your tracking number to get real-time updates on your shipment status.
          </p>
          <form onSubmit={handleTrack} className="max-w-2xl mx-auto mt-8">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                  className={`w-full px-4 py-3 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-700' 
                      : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
                  } focus:ring-2 focus:ring-[#ffbe03] focus:border-[#ffbe03]`}
                />
                <FaSearch className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
                  isDarkMode
                    ? 'bg-[#ffbe03] text-gray-900 hover:bg-[#e6a902] focus:ring-[#ffbe03] focus:ring-offset-gray-900'
                    : 'bg-white text-[#351c15] hover:bg-gray-100 focus:ring-[#351c15] focus:ring-offset-[#351c15]'
                }`}
              >
                {loading ? 'Tracking...' : 'Track'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Shipment Details */}
      {shipment && (
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
              {/* Status Header */}
              <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`}>
                      Tracking Number: {shipment.trackingNumber}
                    </h2>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(shipment.status)}
                      <span className={`font-semibold ${getStatusColor(shipment.status)}`}>
                        {shipment.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <FaCalendarAlt className={isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'} />
                      <span>Expected Delivery: {shipment.expectedDeliveryDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipment Status */}
              <div className={`rounded-lg p-6 mb-6 ${
                isDarkMode 
                  ? 'bg-[#1e2329] shadow-lg shadow-black/20' 
                  : 'bg-gray-50 shadow-lg'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`}>Shipment Status</h2>
                    <div className={`flex items-center gap-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      <FaMapMarkerAlt size={20} className={isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'} />
                      <div>
                        <div className="text-sm text-gray-400 uppercase">Current Location</div>
                        <div className="text-lg font-semibold">{shipment.currentLocation}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                      shipment.status.toLowerCase() === 'delivered' 
                        ? isDarkMode ? 'bg-green-500/10' : 'bg-green-100'
                        : shipment.status.toLowerCase() === 'in_transit'
                        ? isDarkMode ? 'bg-blue-500/10' : 'bg-blue-100'
                        : shipment.status.toLowerCase() === 'delayed'
                        ? isDarkMode ? 'bg-red-500/10' : 'bg-red-100'
                        : shipment.status.toLowerCase() === 'on_hold'
                        ? isDarkMode ? 'bg-yellow-500/10' : 'bg-yellow-100'
                        : isDarkMode ? 'bg-gray-500/10' : 'bg-gray-100'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        shipment.status.toLowerCase() === 'delivered'
                          ? isDarkMode ? 'bg-green-400' : 'bg-green-500'
                          : shipment.status.toLowerCase() === 'in_transit'
                          ? isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                          : shipment.status.toLowerCase() === 'delayed'
                          ? isDarkMode ? 'bg-red-400' : 'bg-red-500'
                          : shipment.status.toLowerCase() === 'on_hold'
                          ? isDarkMode ? 'bg-yellow-400' : 'bg-yellow-500'
                          : isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                      }`}></div>
                      <span className={`text-sm font-semibold ${
                        shipment.status.toLowerCase() === 'delivered'
                          ? isDarkMode ? 'text-green-400' : 'text-green-600'
                          : shipment.status.toLowerCase() === 'in_transit'
                          ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                          : shipment.status.toLowerCase() === 'delayed'
                          ? isDarkMode ? 'text-red-400' : 'text-red-600'
                          : shipment.status.toLowerCase() === 'on_hold'
                          ? isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                          : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {shipment.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </div>
                    <div className={`mt-3 flex items-center gap-3 justify-end ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      <FaCalendarAlt size={20} className={isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'} />
                      <div>
                        <div className="text-sm text-gray-400 uppercase">Expected Delivery</div>
                        <div className="font-semibold">{shipment.expectedDeliveryDate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipment Details */}
              <div className={`rounded-lg p-6 mb-6 ${
                isDarkMode 
                  ? 'bg-[#1e2329] shadow-lg shadow-black/20' 
                  : 'bg-gray-50 shadow-lg'
              }`}>
                <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`}>Shipment Details</h2>
                <div className={`grid grid-cols-4 gap-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt size={18} className={isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'} />
                    <div>
                      <div className="text-sm text-gray-400 uppercase">From</div>
                      <div className="font-semibold">{shipment.origin}</div>
                      <div className="text-sm text-gray-400 uppercase mt-1">To</div>
                      <div className="font-semibold">{shipment.destination}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getCarrierIcon(shipment.carrier)}
                    <div>
                      <div className="text-sm text-gray-400 uppercase">Carrier</div>
                      <div className="font-semibold">{shipment.carrier}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(shipment.typeOfShipment)}
                    <div>
                      <div className="text-sm text-gray-400 uppercase">Type</div>
                      <div className="font-semibold">{shipment.typeOfShipment.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getShipmentModeIcon(shipment.shipmentMode)}
                    <div>
                      <div className="text-sm text-gray-400 uppercase">Mode</div>
                      <div className="font-semibold">{shipment.shipmentMode.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPaymentIcon(shipment.paymentMode)}
                    <div>
                      <div className="text-sm text-gray-400 uppercase">Payment</div>
                      <div className="font-semibold">{shipment.paymentMode.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaDollarSign size={18} className={isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'} />
                    <div>
                      <div className="text-sm text-gray-400 uppercase">Total Freight</div>
                      <div className="font-semibold">${shipment.totalFreight}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock size={18} className={isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'} />
                    <div>
                      <div className="text-sm text-gray-400 uppercase">Pickup</div>
                      <div className="font-semibold">{shipment.pickupDate} {shipment.pickupTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock size={18} className={isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'} />
                    <div>
                      <div className="text-sm text-gray-400 uppercase">Departure</div>
                      <div className="font-semibold">{shipment.departureTime}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div className={`rounded-lg p-6 mb-6 ${
                isDarkMode 
                  ? 'bg-[#1e2329] shadow-lg shadow-black/20' 
                  : 'bg-gray-50 shadow-lg'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`}>Package Details</h2>
                  <div className="flex items-center gap-2">
                    <FaWeightHanging size={18} className={isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'} />
                    <span className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{shipment.packages[0]?.weight} kg</span>
                  </div>
                </div>
                <div className={`flex items-center gap-3 mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FaBox size={18} className={isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'} />
                  <span className="font-semibold">Package 1 (1 Box)</span>
                </div>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm leading-relaxed`}>
                  {shipment.packages[0]?.description}
                </p>
              </div>

              {/* Tracking History */}
              <div className={`rounded-lg p-6 ${
                isDarkMode 
                  ? 'bg-[#1e2329] shadow-lg shadow-black/20' 
                  : 'bg-gray-50 shadow-lg'
              }`}>
                <h2 className={`text-xl font-bold mb-8 ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`}>Tracking History</h2>
                <div className="relative">
                  <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-700/30"></div>
                  <div className="space-y-8">
                    {shipment.shipmentHistory?.map((history, index) => {
                      let statusColor;
                      let StatusIcon;
                      let bgColor;
                      
                      switch (history.status.toLowerCase()) {
                        case 'pending':
                          statusColor = isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
                          bgColor = isDarkMode ? 'bg-yellow-400/10' : 'bg-yellow-100';
                          StatusIcon = FaClock;
                          break;
                        case 'in_transit':
                          statusColor = isDarkMode ? 'text-blue-400' : 'text-blue-600';
                          bgColor = isDarkMode ? 'bg-blue-400/10' : 'bg-blue-100';
                          StatusIcon = FaTruck;
                          break;
                        case 'delayed':
                          statusColor = isDarkMode ? 'text-red-400' : 'text-red-600';
                          bgColor = isDarkMode ? 'bg-red-400/10' : 'bg-red-100';
                          StatusIcon = FaExclamationTriangle;
                          break;
                        case 'delivered':
                          statusColor = isDarkMode ? 'text-green-400' : 'text-green-600';
                          bgColor = isDarkMode ? 'bg-green-400/10' : 'bg-green-100';
                          StatusIcon = FaCheckCircle;
                          break;
                        case 'on_hold':
                          statusColor = isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
                          bgColor = isDarkMode ? 'bg-yellow-400/10' : 'bg-yellow-100';
                          StatusIcon = FaPauseCircle;
                          break;
                        default:
                          statusColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
                          bgColor = isDarkMode ? 'bg-gray-400/10' : 'bg-gray-100';
                          StatusIcon = FaBox;
                      }

                      return (
                        <div key={index} className="relative pl-10">
                          <div className={`absolute left-0 -ml-1.5 p-1.5 rounded-full ${bgColor}`}>
                            <StatusIcon size={16} className={statusColor} />
                          </div>
                          <div className={`p-4 rounded-lg ${
                            isDarkMode 
                              ? 'bg-[#262b33] shadow-md shadow-black/10' 
                              : 'bg-white shadow-sm'
                          }`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <div className={`font-bold text-sm uppercase mb-1 ${statusColor}`}>
                                  {history.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {history.date} {history.time}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`font-bold text-sm uppercase ${
                                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                  {history.location}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {history.remarks}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className={`p-6 ${
                isDarkMode 
                  ? 'bg-[#1e2329] shadow-lg shadow-black/20' 
                  : 'bg-gray-50 shadow-lg'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Shipper</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FaUser className={`${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{shipment.shipperName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaPhone className={`${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{shipment.shipperPhone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEnvelope className={`${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{shipment.shipperEmail}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Receiver</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FaUser className={`${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{shipment.receiverName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaPhone className={`${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{shipment.receiverPhone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEnvelope className={`${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{shipment.receiverEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      {!shipment && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`}>
              We are the world's leading shipping service provider
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-700'} max-w-3xl mx-auto`}>
              Over the years, we have worked together to expand our network of partners to deliver reliability and consistency. We've also made significant strides to tightly integrate technology with our processes, giving our clients greater visibility into every engagement.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Track; 