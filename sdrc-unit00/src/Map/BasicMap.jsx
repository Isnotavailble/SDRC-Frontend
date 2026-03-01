import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet'; // Make sure L is imported for the icons!
import 'leaflet/dist/leaflet.css';
import './BasicMap.css';
import MapResizer from './MapUtil/MapResizer';
import MapClickEventHandler from './MapUtil/MapClickEventHandler';

// -------------------------------------------------------------------
// 1. ICONS & CACHE SETUP
// -------------------------------------------------------------------
const redMarkerIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const blueMarkerIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Cache to prevent hitting OSM twice for the same exact coordinates
const locationCache = new Map();

const getOsmLocationName = async (lat, lon) => {
    const cacheKey = `${lat},${lon}`;
    if (locationCache.has(cacheKey)) return locationCache.get(cacheKey);

    const email = "tomlit88@gmail.com"; // Replace with your actual email
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&email=${email}&accept-language=my,en`;

    try {
        const response = await fetch(url, { headers: { 'Accept-Language': 'en' } });
        if (!response.ok) throw new Error("OSM Fetch Failed");
        const data = await response.json();

        const locationName = data.address.city || data.address.town || data.address.state || data.display_name;
        locationCache.set(cacheKey, locationName);
        return locationName;
    } catch (error) {
        return "Unknown Location";
    }
};

// -------------------------------------------------------------------
// 2. SMART MARKER COMPONENT
// -------------------------------------------------------------------
const SmartMarker = ({ p, centerPoint }) => {
    const [fetchedAddress, setFetchedAddress] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    // Check if this specific marker is the center point (make it red)
    const isCenter = centerPoint && centerPoint[0] === p.latitude && centerPoint[1] === p.longitude;

    const handleMarkerClick = async () => {
        // If we already have the address, or it's currently loading, do nothing!
        if (fetchedAddress || isFetching) return;

        setIsFetching(true);
        const name = await getOsmLocationName(p.latitude, p.longitude);
        setFetchedAddress(name);
        setIsFetching(false);
    };

    return (
        <Marker
            position={[p.latitude, p.longitude]}
            icon={isCenter ? redMarkerIcon : blueMarkerIcon}
            eventHandlers={{ click: handleMarkerClick }}
        >
            <Popup>
                <div style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    textAlign: "center", minWidth: "140px"
                }}>
                    {/* The OSM Address shows up here! */}
                    <b style={{ fontSize: "13px", color: "#444" }}>
                        {isFetching ? "Fetching location..." : (fetchedAddress || p.location || "Click to load address")}
                    </b>

                    <p style={{ marginTop: "5px", marginBottom: "0px", fontSize: "12px", color: "#666" }}>
                        Severity: {p.severityValue || `${p.latitude.toFixed(4)}, ${p.longitude.toFixed(4)}`}
                    </p>
                </div>
            </Popup>
        </Marker>
    );
};

// -------------------------------------------------------------------
// 3. MAIN MAP COMPONENT
// -------------------------------------------------------------------
function DynamicCenter({ centerPoint }) {
    const map = useMap();
    useEffect(() => {
        if (centerPoint) {
            map.setView(centerPoint, map.getZoom());
            map.closePopup();
        }
    }, [centerPoint, map]);
    return null;
}

function BasicMap({ centerPoint, points, onMapClick, isEditing }) {
    const [selectedPoint, setSelectedPoint] = useState(null);

    useEffect(() => {
        console.log("map center at", centerPoint);
    }, [centerPoint]);

    return (
        <MapContainer center={centerPoint || [16.8980, 96.1311]} zoom={6} scrollWheelZoom={true} className='basic-map-container'>
            <MapResizer />
            <DynamicCenter centerPoint={centerPoint} />
            {isEditing && <MapClickEventHandler onMapClick={onMapClick} setSelectedPoint={setSelectedPoint} />}

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Render our new Smart Markers */}
            {points?.length > 0 && points.map((p, i) => (
                <SmartMarker
                    key={i}
                    p={p}
                    centerPoint={centerPoint}
                />
            ))}

            {/* Editing Mode Marker */}
            {selectedPoint && isEditing && (
                <Marker position={[selectedPoint.lat, selectedPoint.lng]}>
                    <Popup>
                        {`${Math.round(selectedPoint.lat * 100000) / 100000}, ${Math.round(selectedPoint.lng * 100000) / 100000}`}
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default BasicMap;