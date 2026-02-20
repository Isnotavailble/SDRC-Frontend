
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './BasicMap.css';
import MapResizer from './ResizeHandler/MapResizer';

const BasicMap = () => {
    const centerPosition = [16.8409, 96.1492];

    return (
        <MapContainer center={centerPosition} zoom={13} scrollWheelZoom={true} className='basic-map-container'>
            <MapResizer />

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={centerPosition}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default BasicMap;