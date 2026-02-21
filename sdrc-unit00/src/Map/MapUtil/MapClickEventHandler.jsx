import { useMap, useMapEvents } from "react-leaflet";

export default function MapClickEventHandler({ onMapClick ,setSelectedPoint}) {
    const map = useMap();
    map.Mar
    useMapEvents({
        click: (e) => {
            // e.latlng contains the exact { lat, lng } of the click!
            if (onMapClick) {
                onMapClick(e.latlng);
                setSelectedPoint(e.latlng);
            }
        },
    });
    return null; // This component renders nothing visually
}