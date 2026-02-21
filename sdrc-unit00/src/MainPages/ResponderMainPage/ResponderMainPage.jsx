import { Ambulance, Circle, MapPinned, Navigation } from "lucide-react";
import "./ResponderMainPage.css"
import { useEffect, useState } from "react";
import MonitorResources from "../Features/Monitor_Resources/MonitorResources";

export default function ResponderMainPage() {
    const features = ["resources", "disasters", "alerts"];

    const [currentMode, setCurrentMode] = useState(features[0]);
    //log for clicking features 
    useEffect(() => {
        console.log("current mode : " + currentMode);
    }, [currentMode]);

    return (

        <div className="responder-main-page-container">
            {/*function button rows*/}
            <div className="responder-features-row">
                <button onClick={() => { setCurrentMode(features[0]); }}>
                    <Ambulance className="responder-main-page-icon" />
                    <p>Resources</p>
                </button>
                <button>
                    <MapPinned className="responder-main-page-icon" />
                    <p>Disasters</p>
                </button>
                <button>
                    <Navigation className="responder-main-page-icon" />
                    <p>Alerts</p>
                </button>
            </div>

            {/* feature context */}
            <div className="responder-feature-container">
                {currentMode === features[0] && <MonitorResources/> }
            </div>

        </div>

    );
}