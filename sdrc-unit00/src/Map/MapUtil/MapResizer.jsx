import { useEffect } from 'react';
// 1. Import useMap from react-leaflet
import { useMap } from 'react-leaflet';


// 2. Create the Observer Component
export default function MapResizer() {
    const map = useMap(); // This hook grabs the actual Leaflet map instance

    useEffect(() => {
        // Get the raw HTML div that holds the map
        const mapContainer = map.getContainer();

        // Set up the ResizeObserver
        const resizeObserver = new ResizeObserver(() => {
            // Tell Leaflet its container changed size so it re-renders the tiles
            map.invalidateSize();
        });

        // Start watching the map container for width/height changes
        resizeObserver.observe(mapContainer);

        // Cleanup when unmounted
        return () => {
            resizeObserver.disconnect();
        };
    }, [map]);

    return null; // This component is strictly for logic, it renders no HTML
};