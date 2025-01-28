"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [routeHistory, setRouteHistory] = useState<Array<{ lat: number; lng: number }>>([]);
  const [speed, setSpeed] = useState<number>(0);
  const [geofenceAlert, setGeofenceAlert] = useState<string>("");
  const [maintenanceAlert, setMaintenanceAlert] = useState<string>("");
  const [carDetails, setCarDetails] = useState<any>(null);
  const searchParams = useSearchParams();
  const carId = searchParams.get("id");

  useEffect(() => {
    if (!carId) return;

    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`https://678cc7fcf067bf9e24e83478.mockapi.io/carrental?id=${carId}`);
        const data = await response.json();
        if (data.length > 0) {
          setCarDetails(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch car details:", error);
      }
    };

    fetchCarDetails();
  }, [carId]);

  useEffect(() => {
    if (!carDetails) return;

    const script = document.createElement("script");
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
    script.async = true;

    script.onload = () => {
      if (typeof google !== "undefined") {
        const userLocation = { lat: 24.8607, lng: 67.0011 };
        const carLocation = { lat: 24.8934, lng: 67.0281 };

        const map = new google.maps.Map(mapRef.current!, {
          zoom: 12,
          center: userLocation,
          styles: [
            {
              "elementType": "geometry",
              "stylers": [{ "color": "#f5f5f5" }],
            },
            {
              "elementType": "labels.icon",
              "stylers": [{ "visibility": "off" }],
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [{ "color": "#616161" }],
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [{ "color": "#f5f5f5" }],
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [{ "color": "#c9c9c9" }],
            },
          ],
        });

        new google.maps.Marker({
          position: userLocation,
          map,
          title: "Your Location",
          icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        });

        const carMarker = new google.maps.Marker({
          position: carLocation,
          map,
          title: "Your Car",
          icon: "http://maps.google.com/mapfiles/kml/shapes/cabs.png",
        });

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
          map,
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: "#4CAF50",
            strokeOpacity: 1.0,
            strokeWeight: 4,
          },
        });

        directionsService.route(
          {
            origin: userLocation,
            destination: carLocation,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(result);
            }
          }
        );

        let trackingInterval: NodeJS.Timeout;
        const simulateTracking = () => {
          const newCarLocation = {
            lat: carLocation.lat + Math.random() * 0.01 - 0.005,
            lng: carLocation.lng + Math.random() * 0.01 - 0.005,
          };
          carMarker.setPosition(newCarLocation);
          const newSpeed = Math.floor(Math.random() * 120);
          setSpeed(newSpeed);
        };

        trackingInterval = setInterval(simulateTracking, 5000);

        return () => {
          clearInterval(trackingInterval);
        };
      }
    };

    script.onerror = () => {
      console.error("Failed to load Google Maps script.");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [carDetails]);

  if (!carId) {
    return <div className="text-center text-red-500 font-bold text-xl">Error: No car ID found in the URL. Please go back and select a car.</div>;
  }

  if (!carDetails) {
    return <div className="text-center text-gray-500 font-semibold text-lg">Loading car details...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Order/Service Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Car Name", value: carDetails.name },
              { label: "Type", value: carDetails.type },
              { label: "Fuel Capacity", value: carDetails.fuel_capacity },
              { label: "Transmission", value: carDetails.transmission },
              { label: "Seating Capacity", value: carDetails.seating_capacity },
              { label: "Price per Day", value: carDetails.price_per_day },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-gray-700">
                <span className="font-medium">{label}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Location Tracking</h2>
          <div ref={mapRef} className="w-full h-[400px] rounded-lg border"></div>
          <div className="mt-4 flex justify-between text-gray-700">
            <span className="font-medium">Speed:</span>
            <span>{speed} km/h</span>
          </div>
          {geofenceAlert && <div className="mt-2 text-red-500">{geofenceAlert}</div>}
          {maintenanceAlert && <div className="mt-2 text-yellow-500">{maintenanceAlert}</div>}
        </div>

      </div>
    </div>
  );
};

export default MapComponent;
