// Location utilities for map functionality
export interface LocationCoordinates {
  lat: number;
  lng: number;
}

// Common location coordinates mapping
const LOCATION_COORDINATES: Record<string, LocationCoordinates> = {
  // Countries
  'US': { lat: 39.8283, lng: -98.5795 },
  'USA': { lat: 39.8283, lng: -98.5795 },
  'UNITED STATES': { lat: 39.8283, lng: -98.5795 },
  'UK': { lat: 55.3781, lng: -3.4360 },
  'UNITED KINGDOM': { lat: 55.3781, lng: -3.4360 },
  'CAMEROON': { lat: 7.3697, lng: 12.3547 },
  'NIGERIA': { lat: 9.0820, lng: 8.6753 },
  'GHANA': { lat: 7.9465, lng: -1.0232 },
  'KENYA': { lat: -0.0236, lng: 37.9062 },
  'SOUTH AFRICA': { lat: -30.5595, lng: 22.9375 },
  'CHINA': { lat: 35.8617, lng: 104.1954 },
  'INDIA': { lat: 20.5937, lng: 78.9629 },
  'JAPAN': { lat: 36.2048, lng: 138.2529 },
  'GERMANY': { lat: 51.1657, lng: 10.4515 },
  'FRANCE': { lat: 46.2276, lng: 2.2137 },
  'ITALY': { lat: 41.8719, lng: 12.5674 },
  'SPAIN': { lat: 40.4637, lng: -3.7492 },
  'CANADA': { lat: 56.1304, lng: -106.3468 },
  'MEXICO': { lat: 23.6345, lng: -102.5528 },
  'BRAZIL': { lat: -14.2350, lng: -51.9253 },
  'AUSTRALIA': { lat: -25.2744, lng: 133.7751 },
  
  // Major cities
  'LONDON': { lat: 51.5074, lng: -0.1278 },
  'NEW YORK': { lat: 40.7128, lng: -74.0060 },
  'LOS ANGELES': { lat: 34.0522, lng: -118.2437 },
  'CHICAGO': { lat: 41.8781, lng: -87.6298 },
  'HOUSTON': { lat: 29.7604, lng: -95.3698 },
  'PHOENIX': { lat: 33.4484, lng: -112.0740 },
  'PHILADELPHIA': { lat: 39.9526, lng: -75.1652 },
  'SAN ANTONIO': { lat: 29.4241, lng: -98.4936 },
  'SAN DIEGO': { lat: 32.7157, lng: -117.1611 },
  'DALLAS': { lat: 32.7767, lng: -96.7970 },
  'SAN JOSE': { lat: 37.3382, lng: -121.8863 },
  'AUSTIN': { lat: 30.2672, lng: -97.7431 },
  'JACKSONVILLE': { lat: 30.3322, lng: -81.6557 },
  'FORT WORTH': { lat: 32.7555, lng: -97.3308 },
  'COLUMBUS': { lat: 39.9612, lng: -82.9988 },
  'CHARLOTTE': { lat: 35.2271, lng: -80.8431 },
  'SAN FRANCISCO': { lat: 37.7749, lng: -122.4194 },
  'INDIANAPOLIS': { lat: 39.7684, lng: -86.1581 },
  'SEATTLE': { lat: 47.6062, lng: -122.3321 },
  'DENVER': { lat: 39.7392, lng: -104.9903 },
  'WASHINGTON': { lat: 38.9072, lng: -77.0369 },
  'BOSTON': { lat: 42.3601, lng: -71.0589 },
  'EL PASO': { lat: 31.7619, lng: -106.4850 },
  'NASHVILLE': { lat: 36.1627, lng: -86.7816 },
  'DETROIT': { lat: 42.3314, lng: -83.0458 },
  'OKLAHOMA CITY': { lat: 35.4676, lng: -97.5164 },
  'PORTLAND': { lat: 45.5152, lng: -122.6784 },
  'LAS VEGAS': { lat: 36.1699, lng: -115.1398 },
  'MEMPHIS': { lat: 35.1495, lng: -90.0490 },
  'LOUISVILLE': { lat: 38.2527, lng: -85.7585 },
  'BALTIMORE': { lat: 39.2904, lng: -76.6122 },
  'MILWAUKEE': { lat: 43.0389, lng: -87.9065 },
  'ALBUQUERQUE': { lat: 35.0844, lng: -106.6504 },
  'TUCSON': { lat: 32.2226, lng: -110.9747 },
  'FRESNO': { lat: 36.7378, lng: -119.7871 },
  'SACRAMENTO': { lat: 38.5816, lng: -121.4944 },
  'MESA': { lat: 33.4152, lng: -111.8315 },
  'KANSAS CITY': { lat: 39.0997, lng: -94.5786 },
  'ATLANTA': { lat: 33.7490, lng: -84.3880 },
  'LONG BEACH': { lat: 33.7701, lng: -118.1937 },
  'COLORADO SPRINGS': { lat: 38.8339, lng: -104.8214 },
  'RALEIGH': { lat: 35.7796, lng: -78.6382 },
  'MIAMI': { lat: 25.7617, lng: -80.1918 },
  'VIRGINIA BEACH': { lat: 36.8529, lng: -75.9780 },
  'OMAHA': { lat: 41.2565, lng: -95.9345 },
  'OAKLAND': { lat: 37.8044, lng: -122.2711 },
  'MINNEAPOLIS': { lat: 44.9778, lng: -93.2650 },
  'TULSA': { lat: 36.1540, lng: -95.9928 },
  'ARLINGTON': { lat: 32.7357, lng: -97.1081 },
  'TAMPA': { lat: 27.9506, lng: -82.4572 },
  'NEW ORLEANS': { lat: 29.9511, lng: -90.0715 },
  'WICHITA': { lat: 37.6872, lng: -97.3301 },
  'CLEVELAND': { lat: 41.4993, lng: -81.6944 },
  'BAKERSFIELD': { lat: 35.3733, lng: -119.0187 },
  'AURORA': { lat: 39.7294, lng: -104.8319 },
  'ANAHEIM': { lat: 33.8366, lng: -117.9143 },
  'HONOLULU': { lat: 21.3099, lng: -157.8581 },
  'SANTA ANA': { lat: 33.7455, lng: -117.8677 },
  'CORPUS CHRISTI': { lat: 27.8006, lng: -97.3964 },
  'RIVERSIDE': { lat: 33.9533, lng: -117.3962 },
  'LEXINGTON': { lat: 38.0406, lng: -84.5037 },
  'STOCKTON': { lat: 37.9577, lng: -121.2908 },
  'HENDERSON': { lat: 36.0395, lng: -114.9817 },
  'SAINT PAUL': { lat: 44.9537, lng: -93.0900 },
  'ST. PAUL': { lat: 44.9537, lng: -93.0900 },
  'ST LOUIS': { lat: 38.6270, lng: -90.1994 },
  'ST. LOUIS': { lat: 38.6270, lng: -90.1994 },
  'CINCINNATI': { lat: 39.1031, lng: -84.5120 },
  'PITTSBURGH': { lat: 40.4406, lng: -79.9959 },
  'ANCHORAGE': { lat: 61.2181, lng: -149.9003 },
  'GREENSBORO': { lat: 36.0726, lng: -79.7920 },
  'PLANO': { lat: 33.0198, lng: -96.6989 },
  'NEWARK': { lat: 40.7357, lng: -74.1724 },
  'LINCOLN': { lat: 40.8136, lng: -96.7026 },
  'ORLANDO': { lat: 28.5383, lng: -81.3792 },
  'IRVINE': { lat: 33.6846, lng: -117.8265 },
  'NEWARK': { lat: 40.7357, lng: -74.1724 },
  'DURHAM': { lat: 35.9940, lng: -78.8986 },
  'CHULA VISTA': { lat: 32.6401, lng: -117.0842 },
  'TOLEDO': { lat: 41.6528, lng: -83.5379 },
  'FORT WAYNE': { lat: 41.0793, lng: -85.1394 },
  'ST. PETERSBURG': { lat: 27.7731, lng: -82.6400 },
  'LAREDO': { lat: 27.5064, lng: -99.5075 },
  'JERSEY CITY': { lat: 40.7178, lng: -74.0431 },
  'CHANDLER': { lat: 33.3062, lng: -111.8413 },
  'MADISON': { lat: 43.0731, lng: -89.4012 },
  'LUBBOCK': { lat: 33.5779, lng: -101.8552 },
  'SCOTTSDALE': { lat: 33.4942, lng: -111.9261 },
  'RENO': { lat: 39.5296, lng: -119.8138 },
  'BUFFALO': { lat: 42.8864, lng: -78.8784 },
  'GILBERT': { lat: 33.3528, lng: -111.7890 },
  'GLENDALE': { lat: 33.5387, lng: -112.1860 },
  'NORTH LAS VEGAS': { lat: 36.1989, lng: -115.1175 },
  'WINSTON SALEM': { lat: 36.0999, lng: -80.2442 },
  'NORFOLK': { lat: 36.8508, lng: -76.2859 },
  'CHESAPEAKE': { lat: 36.7682, lng: -76.2875 },
  'GARLAND': { lat: 32.9126, lng: -96.6389 },
  'IRVING': { lat: 32.8140, lng: -96.9489 },
  'HIALEAH': { lat: 25.8576, lng: -80.2781 },
  'FREMONT': { lat: 37.5485, lng: -121.9886 },
  'BOISE': { lat: 43.6150, lng: -116.2023 },
  'RICHMOND': { lat: 37.5407, lng: -77.4360 },
  'BATON ROUGE': { lat: 30.4515, lng: -91.1871 },
  'SPOKANE': { lat: 47.6588, lng: -117.4260 },
  
  // African cities
  'YAOUNDE': { lat: 3.8480, lng: 11.5021 },
  'DOUALA': { lat: 4.0511, lng: 9.7679 },
  'LAGOS': { lat: 6.5244, lng: 3.3792 },
  'ABUJA': { lat: 9.0820, lng: 7.3986 },
  'ACCRA': { lat: 5.5600, lng: -0.2057 },
  'NAIROBI': { lat: -1.2921, lng: 36.8219 },
  'JOHANNESBURG': { lat: -26.2041, lng: 28.0473 },
  'CAPE TOWN': { lat: -33.9249, lng: 18.4241 },
  'CAIRO': { lat: 30.0444, lng: 31.2357 },
  'CASABLANCA': { lat: 33.5731, lng: -7.5898 },
  'ALGIERS': { lat: 36.7538, lng: 3.0588 },
  'TUNIS': { lat: 36.8065, lng: 10.1815 },
  'TRIPOLI': { lat: 32.8872, lng: 13.1913 },
  'KHARTOUM': { lat: 15.5007, lng: 32.5599 },
  'ADDIS ABABA': { lat: 9.0320, lng: 38.7486 },
  'DAR ES SALAAM': { lat: -6.8230, lng: 39.2695 },
  'KINSHASA': { lat: -4.4419, lng: 15.2663 },
  'LUANDA': { lat: -8.8383, lng: 13.2343 },
  'MAPUTO': { lat: -25.9692, lng: 32.5732 },
  'HARARE': { lat: -17.8252, lng: 31.0335 },
  'LUSAKA': { lat: -15.3875, lng: 28.3228 },
  'GABORONE': { lat: -24.6282, lng: 25.9231 },
  'WINDHOEK': { lat: -22.5609, lng: 17.0658 },
  'MASERU': { lat: -29.3142, lng: 27.4833 },
  'MBABANE': { lat: -26.3054, lng: 31.1367 },
  'MORONI': { lat: -11.6455, lng: 43.3333 },
  'VICTORIA': { lat: -4.6203, lng: 55.4514 },
  'PORT LOUIS': { lat: -20.1609, lng: 57.5012 },
  'ANTANANARIVO': { lat: -18.8792, lng: 47.5079 },
  'SAINT-DENIS': { lat: -20.8823, lng: 55.4504 },
  'DJIBOUTI': { lat: 11.8251, lng: 42.5903 },
  'ASMARA': { lat: 15.3229, lng: 38.9251 },
  'BAMAKO': { lat: 12.6392, lng: -8.0029 },
  'OUAGADOUGOU': { lat: 12.3714, lng: -1.5197 },
  'NIAMEY': { lat: 13.5136, lng: 2.1098 },
  'NDJAMENA': { lat: 12.1348, lng: 15.0557 },
  'BANGUI': { lat: 4.3947, lng: 18.5582 },
  'BRAZZAVILLE': { lat: -4.2634, lng: 15.2429 },
  'LIBREVILLE': { lat: 0.4162, lng: 9.4673 },
  'MALABO': { lat: 3.7523, lng: 8.7833 },
  'SAO TOME': { lat: 0.1864, lng: 6.6131 },
  'PRAIA': { lat: 14.9311, lng: -23.5087 },
  'BANJUL': { lat: 13.4432, lng: -16.5919 },
  'BISSAU': { lat: 11.8636, lng: -15.5846 },
  'DAKAR': { lat: 14.7167, lng: -17.4677 },
  'NOUAKCHOTT': { lat: 18.0799, lng: -15.9653 },
  'RABAT': { lat: 34.0209, lng: -6.8416 },
  'ALGIERS': { lat: 36.7538, lng: 3.0588 },
  'TUNIS': { lat: 36.8065, lng: 10.1815 },
  'TRIPOLI': { lat: 32.8872, lng: 13.1913 },
  'CAIRO': { lat: 30.0444, lng: 31.2357 },
  'KHARTOUM': { lat: 15.5007, lng: 32.5599 },
  'ADDIS ABABA': { lat: 9.0320, lng: 38.7486 },
  'NAIROBI': { lat: -1.2921, lng: 36.8219 },
  'DAR ES SALAAM': { lat: -6.8230, lng: 39.2695 },
  'KAMPALA': { lat: 0.3476, lng: 32.5825 },
  'KIGALI': { lat: -1.9441, lng: 30.0619 },
  'BUJUMBURA': { lat: -3.3731, lng: 29.9189 },
  'LILONGWE': { lat: -13.9626, lng: 33.7741 },
  'LUSAKA': { lat: -15.3875, lng: 28.3228 },
  'HARARE': { lat: -17.8252, lng: 31.0335 },
  'GABORONE': { lat: -24.6282, lng: 25.9231 },
  'WINDHOEK': { lat: -22.5609, lng: 17.0658 },
  'PRETORIA': { lat: -25.7479, lng: 28.2293 },
  'BLOEMFONTEIN': { lat: -29.0852, lng: 26.1596 },
  'CAPE TOWN': { lat: -33.9249, lng: 18.4241 },
  'DURBAN': { lat: -29.8587, lng: 31.0218 },
  'PORT ELIZABETH': { lat: -33.7139, lng: 25.5207 },
  'EAST LONDON': { lat: -33.0292, lng: 27.8546 },
  'KIMBERLEY': { lat: -28.7282, lng: 24.7499 },
  'PIETERMARITZBURG': { lat: -29.6006, lng: 30.3796 },
  'POLOKWANE': { lat: -23.9045, lng: 29.4698 },
  'MBOMBELA': { lat: -25.4753, lng: 30.9694 },
  'KIMBERLEY': { lat: -28.7282, lng: 24.7499 },
  'PIETERMARITZBURG': { lat: -29.6006, lng: 30.3796 },
  'POLOKWANE': { lat: -23.9045, lng: 29.4698 },
  'MBOMBELA': { lat: -25.4753, lng: 30.9694 },
  
  // Default fallback
  'DEFAULT': { lat: 0, lng: 0 }
};

/**
 * Convert a location name to coordinates
 * @param locationName - The name of the location (city, country, etc.)
 * @returns LocationCoordinates object with lat and lng
 */
export function getLocationCoordinates(locationName: string): LocationCoordinates {
  if (!locationName) {
    return LOCATION_COORDINATES.DEFAULT;
  }

  const normalizedName = locationName.toUpperCase().trim();
  
  // Direct match
  if (LOCATION_COORDINATES[normalizedName]) {
    return LOCATION_COORDINATES[normalizedName];
  }

  // Try to find partial matches
  for (const [key, coords] of Object.entries(LOCATION_COORDINATES)) {
    if (key.includes(normalizedName) || normalizedName.includes(key)) {
      return coords;
    }
  }

  // If no match found, return default coordinates
  return LOCATION_COORDINATES.DEFAULT;
}

/**
 * Calculate the center point between two locations for map display
 * @param origin - Origin location name
 * @param destination - Destination location name
 * @returns Center coordinates for the map
 */
export function getMapCenter(origin: string, destination: string): LocationCoordinates {
  const originCoords = getLocationCoordinates(origin);
  const destCoords = getLocationCoordinates(destination);
  
  // Calculate center point
  const centerLat = (originCoords.lat + destCoords.lat) / 2;
  const centerLng = (originCoords.lng + destCoords.lng) / 2;
  
  return { lat: centerLat, lng: centerLng };
}

/**
 * Calculate appropriate zoom level based on distance between locations
 * @param origin - Origin location name
 * @param destination - Destination location name
 * @returns Zoom level (1-18)
 */
export function getMapZoom(origin: string, destination: string): number {
  const originCoords = getLocationCoordinates(origin);
  const destCoords = getLocationCoordinates(destination);
  
  // Calculate distance between points
  const latDiff = Math.abs(originCoords.lat - destCoords.lat);
  const lngDiff = Math.abs(originCoords.lng - destCoords.lng);
  const maxDiff = Math.max(latDiff, lngDiff);
  
  // Return appropriate zoom level based on distance
  if (maxDiff > 50) return 3;      // Very far (different continents)
  if (maxDiff > 20) return 4;      // Far (different countries)
  if (maxDiff > 10) return 5;      // Medium far (same region)
  if (maxDiff > 5) return 6;       // Medium (same country)
  if (maxDiff > 2) return 8;       // Close (same state/province)
  if (maxDiff > 1) return 10;      // Very close (same city area)
  return 12;                       // Same location
}
