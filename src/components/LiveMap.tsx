import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface LocationMarker {
  lat: number;
  lng: number;
  title: string;
  color?: string;
}

interface LiveMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  height?: string;
  showMarker?: boolean;
  markerTitle?: string;
  showResetButton?: boolean;
  // New props for shipment tracking
  origin?: LocationMarker;
  destination?: LocationMarker;
  currentLocation?: LocationMarker;
  showRoute?: boolean;
  routeColor?: string;
  completedRouteColor?: string;
}

const LiveMap: React.FC<LiveMapProps> = ({
  center = { lat: 51.5074, lng: -0.1278 }, // Default to London
  zoom = 13,
  className = '',
  height = '400px',
  showMarker = true,
  markerTitle = 'NAVISTA Headquarters',
  showResetButton = true,
  origin,
  destination,
  currentLocation,
  showRoute = false,
  routeColor = '#5928b1',
  completedRouteColor = '#10b981'
}) => {
  const { isDarkMode } = useTheme();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const mapId = useRef(`map-${Math.random().toString(36).substr(2, 9)}`);

  const resetMapView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([center.lat, center.lng], zoom);
    }
  };

  useEffect(() => {
    // Check if Leaflet is already loaded
    if ((window as any).L && mapRef.current) {
      const L = (window as any).L;
      
      // Remove existing map if it exists
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (error) {
          // Map already removed or container reused
        }
        mapInstanceRef.current = null;
      }
      
      // Check if container is already used by another map
      if ((mapRef.current as any)._leaflet_id) {
        try {
          L.DomUtil.remove(mapRef.current);
        } catch (error) {
          // Container cleanup failed
        }
      }
      
      // Create new map instance
      try {
        mapInstanceRef.current = L.map(mapRef.current).setView([center.lat, center.lng], zoom);

        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(mapInstanceRef.current);

        // Add markers based on props
        if (origin && destination) {
          // Add origin marker (green)
          const originIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: #10b981; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });
          
          L.marker([origin.lat, origin.lng], { icon: originIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`<b>Origin:</b> ${origin.title}`)
            .openPopup();

          // Add destination marker (red)
          const destIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });
          
          L.marker([destination.lat, destination.lng], { icon: destIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`<b>Destination:</b> ${destination.title}`);

          // Add current location marker (blue) if provided
          if (currentLocation) {
            const currentIcon = L.divIcon({
              className: 'custom-div-icon',
              html: `<div style="background-color: #3b82f6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); animation: pulse 2s infinite;"></div>`,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            });
            
            L.marker([currentLocation.lat, currentLocation.lng], { icon: currentIcon })
              .addTo(mapInstanceRef.current)
              .bindPopup(`<b>Current Location:</b> ${currentLocation.title}`);
          }

          // Add route lines if requested
          if (showRoute) {
            if (currentLocation) {
              // Create two separate route segments with different colors
              
              // Segment 1: Origin to Current Location (completed route - green)
              const completedRoute = L.polyline([
                [origin.lat, origin.lng],
                [currentLocation.lat, currentLocation.lng]
              ], {
                color: completedRouteColor,
                weight: 4,
                opacity: 0.8,
                dashArray: '5, 5'
              }).addTo(mapInstanceRef.current);

              // Segment 2: Current Location to Destination (remaining route - purple)
              const remainingRoute = L.polyline([
                [currentLocation.lat, currentLocation.lng],
                [destination.lat, destination.lng]
              ], {
                color: routeColor,
                weight: 4,
                opacity: 0.8,
                dashArray: '10, 10'
              }).addTo(mapInstanceRef.current);
            } else {
              // Single route line if no current location
              const routeLine = L.polyline([
                [origin.lat, origin.lng],
                [destination.lat, destination.lng]
              ], {
                color: routeColor,
                weight: 4,
                opacity: 0.8,
                dashArray: '10, 10'
              }).addTo(mapInstanceRef.current);
            }

            // Fit map to show all markers
            const bounds = L.latLngBounds([
              [origin.lat, origin.lng],
              [destination.lat, destination.lng],
              ...(currentLocation ? [[currentLocation.lat, currentLocation.lng]] : [])
            ]);
            mapInstanceRef.current.fitBounds(bounds, { padding: [20, 20] });
          }
        } else if (showMarker) {
          // Default single marker
          L.marker([center.lat, center.lng])
            .addTo(mapInstanceRef.current)
            .bindPopup(markerTitle)
            .openPopup();
        }
      } catch (error) {
        console.error('Error creating map:', error);
      }
    } else {
      // Load OpenStreetMap using Leaflet (free alternative to Google Maps)
      const loadMap = async () => {
        // Check if CSS is already loaded
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          link.crossOrigin = '';
          document.head.appendChild(link);
        }

        // Check if JS is already loaded
        if (!(window as any).L) {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
          script.crossOrigin = '';
          
                     script.onload = () => {
             if (mapRef.current && (window as any).L) {
               const L = (window as any).L;
               
               // Remove existing map if it exists
               if (mapInstanceRef.current) {
                 try {
                   mapInstanceRef.current.remove();
                 } catch (error) {
                  // Map already removed or container reused
                 }
                 mapInstanceRef.current = null;
               }
               
               // Check if container is already used by another map
               if ((mapRef.current as any)._leaflet_id) {
                 try {
                   L.DomUtil.remove(mapRef.current);
                 } catch (error) {
                  // Container cleanup failed
                 }
               }
               
               // Create map instance
               try {
                 mapInstanceRef.current = L.map(mapRef.current).setView([center.lat, center.lng], zoom);

                 // Add tile layer (OpenStreetMap)
                 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                   attribution: '© OpenStreetMap contributors',
                   maxZoom: 19,
                 }).addTo(mapInstanceRef.current);

                // Add markers based on props
                if (origin && destination) {
                  // Add origin marker (green)
                  const originIcon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #10b981; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                  });
                  
                  L.marker([origin.lat, origin.lng], { icon: originIcon })
                    .addTo(mapInstanceRef.current)
                    .bindPopup(`<b>Origin:</b> ${origin.title}`)
                    .openPopup();

                  // Add destination marker (red)
                  const destIcon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                  });
                  
                  L.marker([destination.lat, destination.lng], { icon: destIcon })
                    .addTo(mapInstanceRef.current)
                    .bindPopup(`<b>Destination:</b> ${destination.title}`);

                  // Add current location marker (blue) if provided
                  if (currentLocation) {
                    const currentIcon = L.divIcon({
                      className: 'custom-div-icon',
                      html: `<div style="background-color: #3b82f6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); animation: pulse 2s infinite;"></div>`,
                      iconSize: [24, 24],
                      iconAnchor: [12, 12]
                    });
                    
                    L.marker([currentLocation.lat, currentLocation.lng], { icon: currentIcon })
                      .addTo(mapInstanceRef.current)
                      .bindPopup(`<b>Current Location:</b> ${currentLocation.title}`);
                  }

                  // Add route lines if requested
                  if (showRoute) {
                    if (currentLocation) {
                      // Create two separate route segments with different colors
                      
                      // Segment 1: Origin to Current Location (completed route - green)
                      const completedRoute = L.polyline([
                        [origin.lat, origin.lng],
                        [currentLocation.lat, currentLocation.lng]
                      ], {
                        color: completedRouteColor,
                        weight: 4,
                        opacity: 0.8,
                        dashArray: '5, 5'
                      }).addTo(mapInstanceRef.current);

                      // Segment 2: Current Location to Destination (remaining route - purple)
                      const remainingRoute = L.polyline([
                        [currentLocation.lat, currentLocation.lng],
                        [destination.lat, destination.lng]
                      ], {
                        color: routeColor,
                        weight: 4,
                        opacity: 0.8,
                        dashArray: '10, 10'
                      }).addTo(mapInstanceRef.current);
                    } else {
                      // Single route line if no current location
                      const routeLine = L.polyline([
                        [origin.lat, origin.lng],
                        [destination.lat, destination.lng]
                      ], {
                        color: routeColor,
                        weight: 4,
                        opacity: 0.8,
                        dashArray: '10, 10'
                      }).addTo(mapInstanceRef.current);
                    }

                    // Fit map to show all markers
                    const bounds = L.latLngBounds([
                      [origin.lat, origin.lng],
                      [destination.lat, destination.lng],
                      ...(currentLocation ? [[currentLocation.lat, currentLocation.lng]] : [])
                    ]);
                    mapInstanceRef.current.fitBounds(bounds, { padding: [20, 20] });
                  }
                } else if (showMarker) {
                  // Default single marker
                   L.marker([center.lat, center.lng])
                     .addTo(mapInstanceRef.current)
                     .bindPopup(markerTitle)
                     .openPopup();
                 }
               } catch (error) {
                 console.error('Error creating map:', error);
               }
             }
           };

          document.head.appendChild(script);
        }
      };

      loadMap();
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (error) {
          // Cleanup error
        }
        mapInstanceRef.current = null;
      }
    };
  }, [center.lat, center.lng, zoom, showMarker, markerTitle, origin, destination, currentLocation, showRoute, routeColor, completedRouteColor]);

  return (
    <div className="relative">
      <div
        ref={mapRef}
        id={mapId.current}
        className={`w-full rounded-lg shadow-lg ${className}`}
        style={{ height, zIndex: 1 }}
      />
      {showResetButton && (
        <button
          onClick={resetMapView}
          className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg px-3 py-2 text-sm font-medium transition-colors duration-200 z-10"
          title="Reset map view"
          style={{ zIndex: 1000 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      )}
      
      {/* Legend for shipment tracking */}
      {(origin && destination) && (
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 text-sm z-10">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300">Origin</span>
          </div>
          {currentLocation && (
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-gray-700 dark:text-gray-300">Current Location</span>
            </div>
          )}
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300">Destination</span>
          </div>
          {currentLocation && (
            <>
              <div className="flex items-center mb-1">
                <div className="w-3 h-1 bg-green-500 rounded mr-2"></div>
                <span className="text-gray-700 dark:text-gray-300 text-xs">Completed Route</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-1 bg-purple-500 rounded mr-2"></div>
                <span className="text-gray-700 dark:text-gray-300 text-xs">Remaining Route</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveMap;
