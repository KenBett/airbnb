"use client";
import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  center?: number[];
}

const defaultIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconRetinaUrl: "/images/marker-icon-2x.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const MapViewHandler = ({ center }: { center?: number[] }) => {
  const map = useMap();
  // Properly typed and initialized useRef
  const prevCenterRef = useRef<number[] | undefined>(undefined);

  useEffect(() => {
    if (center && center.length === 2) {
      const newCenter: L.LatLngExpression = [center[0], center[1]];
      
      if (!prevCenterRef.current || 
          prevCenterRef.current[0] !== center[0] || 
          prevCenterRef.current[1] !== center[1]) {
        
        map.flyTo(newCenter, 6, {  // Using zoom level 6 for country view
          duration: 0.8,
          easeLinearity: 0.25
        });
      }
      
      prevCenterRef.current = center;
    }
  }, [center, map]);

  return null;
};

const Map: React.FC<MapProps> = ({ center }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[35vh] rounded-lg bg-gray-200 flex items-center justify-center">
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [51, -0.09]}
      zoom={center ? 6 : 2}  // Consistent zoom level 6 when centered
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && (
        <>
          <Marker position={center as L.LatLngExpression} />
          <MapViewHandler center={center} />
        </>
      )}
    </MapContainer>
  );
};

export default Map;