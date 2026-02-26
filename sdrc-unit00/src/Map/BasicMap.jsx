
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './BasicMap.css';
import MapResizer from './MapUtil/MapResizer';
import { useEffect, useState } from 'react';
import MapClickEventHandler from './MapUtil/MapClickEventHandler';

// 1. Create a helper component that uses the map instance
function DynamicCenter({ centerPoint }) {
    const map = useMap(); // This gets the underlying Leaflet map instance

    useEffect(() => {
        if (centerPoint) {
            // map.setView instantly jumps to the new center
            // map.flyTo(centerPoint) is another option if you want a smooth animation!
            map.setView(centerPoint, map.getZoom());
        }
    }, [centerPoint, map]);

    return null; // This component doesn't render any HTML
}

function BasicMap({ centerPoint, points, onMapClick ,isEditing }) {
    const [selectedPoint, setSelectedPoint] = useState(null);
    useEffect(() => {
        console.log("map center at", centerPoint);
    }, [centerPoint]);

    return (
        <MapContainer center={centerPoint || [16.8980,96.1311]} zoom={13} scrollWheelZoom={true} className='basic-map-container'>
            <MapResizer />
            <DynamicCenter centerPoint={centerPoint} />
            {isEditing && <MapClickEventHandler onMapClick={onMapClick} setSelectedPoint={setSelectedPoint} />}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {points?.length > 0 &&
                points.map((p, i) =>
                    <Marker key={i} position={[p.latitude, p.longitude]}>
                        <Popup>
                            {p.resource_name || p.severityValue}
                        </Popup>
                    </Marker>)
            }
            {
                selectedPoint && isEditing &&
                <Marker position={[selectedPoint.lat, selectedPoint.lng]}>
                    <Popup>
                        {`${Math.round(selectedPoint.lat * 100000) / 100000},${Math.round(selectedPoint.lng * 100000) / 100000}`}
                    </Popup>
                </Marker>
            }
        </MapContainer>
    );
};

export default BasicMap;