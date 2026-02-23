import { Ambulance, Circle, MapPinned, Navigation } from "lucide-react";
import "./ResponderMainPage.css"
import { useEffect, useState } from "react";
import MonitorResources from "../Features/Monitor_Resources/MonitorResources";
import MonitorDisasters from "../Features/Monitor_Disasters/MonitorDisaster";
import AnimateInView from "../../Animations/AnimateInView";

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
                <button onClick={() => { setCurrentMode(features[1]); }}>
                    <MapPinned className="responder-main-page-icon" />
                    <p>Disasters</p>
                </button>
                {/*Rejected Featre*/
                    /*<button>
                        <Navigation className="responder-main-page-icon" />
                        <p>Alerts</p>
                    </button>
                    */
                }
            </div>

            {/* feature context */}
            <div className="responder-feature-container">
                {currentMode === features[0] && <MonitorResources />}
                {currentMode === features[1] && <MonitorDisasters />}
            </div>

        </div>

    );
}