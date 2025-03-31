import React, { useState } from 'react';
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
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from 'react-icons/fa';
import AnimatedCard from '../components/animations/AnimatedCard';

const Track: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToTop();
  };

  const handleFreightModeClick = (mode: string) => {
    // Find the element with the matching freight mode
    const element = document.getElementById(`freight-mode-${mode.toLowerCase().replace(/\s+/g, '-')}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Add highlight effect
      element.classList.add('animate-pulse');
      setTimeout(() => {
        element.classList.remove('animate-pulse');
      }, 2000);
    }
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

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section with Tracking */}
      <div className="bg-[#351c15] dark:bg-[#1a0e0a] text-white py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Track Your Shipment</h1>
            <p className="text-base sm:text-lg mb-6 sm:mb-8">Enter your tracking number to get real-time updates</p>
            <form onSubmit={handleTrack} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                    className={`w-full px-4 py-3 rounded-lg text-base sm:text-lg ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-700' 
                        : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
                    } focus:ring-2 focus:ring-[#ffbe03] focus:border-[#ffbe03]`}
                  />
                  <FaSearch className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg sm:text-xl`} />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 sm:px-8 py-3 font-semibold rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
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
      </div>

      {shipment ? (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          {/* Shipment Status */}
          <div className={`rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 ${
            isDarkMode 
              ? 'bg-slate-800 shadow-lg shadow-slate-900/20' 
              : 'bg-white shadow-lg'
          }`}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
              <div>
                <h2 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#b98f31]'}`}>SHIPMENT STATUS</h2>
                <div className={`flex items-center gap-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  <FaMapMarkerAlt className={`text-lg sm:text-xl ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#b98f31]'}`} />
                  <div>
                    <div className="text-xs sm:text-sm text-gray-400 uppercase">CURRENT LOCATION</div>
                    <div className="text-base sm:text-lg font-semibold uppercase">{shipment.currentLocation}</div>
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-right">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                  shipment.status.toLowerCase() === 'delivered' 
                    ? isDarkMode ? 'bg-green-400/10' : 'bg-green-100'
                    : shipment.status.toLowerCase() === 'in_transit'
                    ? isDarkMode ? 'bg-blue-400/10' : 'bg-blue-100'
                    : shipment.status.toLowerCase() === 'delayed'
                    ? isDarkMode ? 'bg-red-400/10' : 'bg-red-100'
                    : shipment.status.toLowerCase() === 'on_hold'
                    ? isDarkMode ? 'bg-yellow-400/10' : 'bg-yellow-100'
                    : isDarkMode ? 'bg-gray-400/10' : 'bg-gray-100'
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
                  <span className={`text-xs sm:text-sm font-semibold uppercase ${
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
                    {shipment.status.toUpperCase().replace(/_/g, ' ')}
                      </span>
                </div>
                <div className={`mt-3 flex items-center gap-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  <FaCalendarAlt className={`text-lg sm:text-xl ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#b98f31]'}`} />
                    <div>
                    <div className="text-xs sm:text-sm text-gray-400 uppercase">EXPECTED DELIVERY</div>
                    <div className="text-sm sm:text-base font-semibold">{shipment.expectedDeliveryDate}</div>
                  </div>
                </div>
              </div>
                  </div>
              </div>

              {/* Tracking History */}
          <div className={`rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-md'}`}>
            <h2 className={`text-lg sm:text-xl font-bold mb-6 sm:mb-8 ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#b98f31]'}`}>TRACKING HISTORY</h2>
                <div className="relative">
              <div className="absolute left-[15px] sm:left-[19px] top-0 bottom-0 w-0.5 bg-gray-700/30"></div>
              <div className="space-y-6 sm:space-y-8">
                    {shipment.shipmentHistory?.map((history, index) => {
                      let statusColor;
                      let StatusIcon;
                      let bgColor;
                      
                      switch (history.status.toLowerCase()) {
                        case 'pending':
                      statusColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
                      bgColor = isDarkMode ? 'bg-gray-400/10' : 'bg-gray-100';
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
                    <div key={index} className="relative pl-8 sm:pl-10">
                      <div className={`absolute left-0 ml-[3px] mt-[30px] sm:ml-[6px] sm:mt-[20px] p-1.5 rounded-full ${bgColor}`}>
                        <StatusIcon className={`text-sm sm:text-base ${statusColor}`} />
                          </div>
                      <div className={`p-3 sm:p-4 rounded-lg ${
                            isDarkMode 
                          ? 'bg-slate-700 shadow-md shadow-slate-900/10' 
                              : 'bg-gray-50 shadow-sm'
                          }`}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-6">
                              <div>
                            <div className={`font-bold text-xs sm:text-sm uppercase mb-1 ${statusColor}`}>
                              {history.status.toUpperCase().replace(/_/g, ' ')}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {history.date} {history.time}
                                </div>
                              </div>
                          <div className="text-left sm:text-right">
                            <div className={`font-bold text-xs sm:text-sm uppercase ${
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

          {/* Shipment Details */}
          <div className={`rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-md'}`}>
            <h2 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#b98f31]'}`}>SHIPMENT DETAILS</h2>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                <div>
                  <div className="flex items-center gap-2 sm:block">
                    <div className="text-xs sm:text-sm text-gray-400 uppercase">FROM</div>
                    <div className="text-sm sm:text-base font-semibold uppercase">{shipment.origin}</div>
                  </div>
                  <div className="flex items-center gap-2 sm:block mt-1">
                    <div className="text-xs sm:text-sm text-gray-400 uppercase">TO</div>
                    <div className="text-sm sm:text-base font-semibold uppercase">{shipment.destination}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaTruck className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                <div>
                  <div className="flex items-center gap-2 sm:block">
                    <div className="text-xs sm:text-sm text-gray-400 uppercase">CARRIER</div>
                    <div className="text-sm sm:text-base font-semibold uppercase">{shipment.carrier}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaBox className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                <div>
                  <div className="flex items-center gap-2 sm:block">
                    <div className="text-xs sm:text-sm text-gray-400 uppercase">TYPE</div>
                    <div className="text-sm sm:text-base font-semibold uppercase">{shipment.typeOfShipment}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {shipment.shipmentMode.toLowerCase().includes('sea') ? (
                  <FaShip className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                ) : shipment.shipmentMode.toLowerCase().includes('air') ? (
                  <FaPlane className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                ) : (
                  <FaTruck className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                )}
                <div>
                  <div className="flex items-center gap-2 sm:block">
                    <div className="text-xs sm:text-sm text-gray-400 uppercase">MODE</div>
                    <div className="text-sm sm:text-base font-semibold uppercase">{shipment.shipmentMode}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaCreditCard className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                <div>
                  <div className="flex items-center gap-2 sm:block">
                    <div className="text-xs sm:text-sm text-gray-400 uppercase">PAYMENT</div>
                    <div className="text-sm sm:text-base font-semibold uppercase">{shipment.paymentMode.toUpperCase().replace(/_/g, ' ')}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaDollarSign className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                <div>
                  <div className="flex items-center gap-2 sm:block">
                    <div className="text-xs sm:text-sm text-gray-400 uppercase">TOTAL FREIGHT</div>
                    <div className="text-sm sm:text-base font-semibold uppercase">${shipment.totalFreight}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                <div>
                  <div className="text-xs sm:text-sm text-gray-400 uppercase">PICKUP</div>
                  <div className="text-sm sm:text-base font-semibold">{shipment.pickupDate} {shipment.pickupTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                <div>
                  <div className="text-xs sm:text-sm text-gray-400 uppercase">DEPARTURE</div>
                  <div className="text-sm sm:text-base font-semibold">{shipment.departureTime}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className={`rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-md'}`}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-3 sm:mb-4">
              <h2 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#b98f31]'}`}>PACKAGE DETAILS</h2>
              <div className="flex items-center gap-2">
                <FaWeightHanging className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                <span className={`text-sm sm:text-base font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Total Weight: {shipment.packages.reduce((total, pkg) => total + pkg.weight, 0)} KG
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {shipment.packages.map((pkg, index) => (
                <div key={index} className={`p-3 sm:p-4 rounded-lg ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3 mb-2 sm:mb-3">
                    <FaBox className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                    <span className={`text-sm sm:text-base font-semibold uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Package {index + 1} ({pkg.quantity} {pkg.pieceType})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <FaWeightHanging className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                      <div>
                        <div className="text-xs sm:text-sm text-gray-400 uppercase">WEIGHT</div>
                        <div className={`text-sm sm:text-base font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{pkg.weight} KG</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRuler className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                      <div>
                        <div className="text-xs sm:text-sm text-gray-400 uppercase">DIMENSIONS</div>
                        <div className={`text-sm sm:text-base font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {pkg.length} x {pkg.width} x {pkg.height} cm
                  </div>
                      </div>
                      </div>
                      <div className="flex items-center gap-2">
                      <FaBoxOpen className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                      <div>
                        <div className="text-xs sm:text-sm text-gray-400 uppercase">QUANTITY</div>
                        <div className={`text-sm sm:text-base font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{pkg.quantity}</div>
                      </div>
                      </div>
                      <div className="flex items-center gap-2">
                      <FaBox className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                      <div>
                        <div className="text-xs sm:text-sm text-gray-400 uppercase">PIECE TYPE</div>
                        <div className={`text-sm sm:text-base font-semibold uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{pkg.pieceType}</div>
                      </div>
                    </div>
                  </div>
                  <div className={`mt-3 p-3 rounded-lg ${
                    isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
                  }`}>
                    <div className={`text-sm sm:text-base font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{pkg.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipper and Receiver Information */}
          <div className={`rounded-lg p-4 sm:p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-md'}`}>
            <h2 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#b98f31]'}`}>SHIPPER & RECEIVER INFORMATION</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Shipper Information */}
              <div className={`space-y-2 sm:space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex items-center gap-2">
                  <FaUser className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                  <span className="text-sm sm:text-base uppercase">{shipment.shipperName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                  <span className="text-sm sm:text-base uppercase">{shipment.shipperAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                  <span className="text-sm sm:text-base">{shipment.shipperPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                  <span className="text-sm sm:text-base">{shipment.shipperEmail}</span>
                </div>
              </div>

              {/* Receiver Information */}
              <div className={`space-y-2 sm:space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex items-center gap-2">
                  <FaUser className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                  <span className="text-sm sm:text-base uppercase">{shipment.receiverName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                  <span className="text-sm sm:text-base uppercase">{shipment.receiverAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                  <span className="text-sm sm:text-base">{shipment.receiverPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className={`text-base sm:text-lg ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                  <span className="text-sm sm:text-base">{shipment.receiverEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Features Section */}
          <div className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className={`text-3xl sm:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Why Choose Our Tracking Service?
                </h2>
                <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Experience seamless shipment tracking with our state-of-the-art system
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Real-time Tracking */}
                <AnimatedCard>
                  <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
                    <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-[#ffbe03]/10' : 'bg-[#351c15]/10'} flex items-center justify-center mb-4`}>
                      <FaMapMarkerAlt className={`text-2xl ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                    </div>
                    <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Real-time Tracking
                    </h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Monitor your shipments in real-time with accurate location updates and estimated delivery times.
                    </p>
                  </div>
                </AnimatedCard>

                {/* Global Coverage */}
                <AnimatedCard>
                  <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
                    <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-[#ffbe03]/10' : 'bg-[#351c15]/10'} flex items-center justify-center mb-4`}>
                      <FaPlane className={`text-2xl ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                    </div>
                    <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Global Coverage
                    </h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Track shipments worldwide with our extensive network of carriers and partners.
                    </p>
                  </div>
                </AnimatedCard>

                {/* Detailed Updates */}
                <AnimatedCard>
                  <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
                    <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-[#ffbe03]/10' : 'bg-[#351c15]/10'} flex items-center justify-center mb-4`}>
                      <FaBox className={`text-2xl ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`} />
                    </div>
                    <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Detailed Updates
                    </h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Get comprehensive shipment details including status, location, and delivery updates.
                    </p>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className={`py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className={`text-3xl sm:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  How It Works
                </h2>
                <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Track your shipment in three simple steps
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full ${isDarkMode ? 'bg-[#ffbe03]' : 'bg-[#351c15]'} flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Enter Tracking Number
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Input your tracking number in the search box above
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full ${isDarkMode ? 'bg-[#ffbe03]' : 'bg-[#351c15]'} flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Get Real-time Updates
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    View detailed shipment information and status
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full ${isDarkMode ? 'bg-[#ffbe03]' : 'bg-[#351c15]'} flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Track Delivery Progress
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Monitor your shipment's journey until delivery
                  </p>
                </div>
              </div>
            </div>
          </div>

      {/* About Section */}
          <div className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Your Trusted Shipping Partner
            </h2>
                  <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    We provide reliable and efficient shipping solutions worldwide. Our advanced tracking system ensures you always know where your shipment is and when it will arrive.
                  </p>
                  <ul className={`space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li className="flex items-center gap-3">
                      <FaCheckCircle className={isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'} />
                      <span>24/7 shipment tracking</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheckCircle className={isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'} />
                      <span>Global shipping network</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheckCircle className={isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'} />
                      <span>Professional support team</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheckCircle className={isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'} />
                      <span>Secure and reliable service</span>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Shipping operations"
                    className="rounded-xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Track; 