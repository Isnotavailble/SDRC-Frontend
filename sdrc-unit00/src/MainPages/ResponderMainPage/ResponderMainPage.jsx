import { Ambulance, Circle, MapPinned, Navigation, Timer } from "lucide-react";
import "./ResponderMainPage.css"
import { useEffect, useState } from "react";
import MonitorResources from "../Features/Monitor_Resources/MonitorResources";
import MonitorDisasters from "../Features/Monitor_Disasters/MonitorDisaster";
import AnimateInView from "../../Animations/AnimateInView";
import axios from "axios";

export default function ResponderMainPage() {
    const features = ["resources", "disasters", "alerts"];

    const [currentMode, setCurrentMode] = useState(features[0]);
    const [isApproved, setisApproved] = useState(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        return user.is_approved;
    });
    useEffect(() => {
        const getPermession = async () => {
            const res = await axios.get("http://localhost:8080/api/v1/auth/profile", { headers: { Authorization: `Bearer ${localStorage.getItem("user_token")}` } })
            setisApproved(res.data.data.is_approved);
        }
        getPermession();
    }, []);
    //log for clicking features 
    useEffect(() => {
        console.log("current mode : " + currentMode);
    }, [currentMode]);

    return (

        <div className="responder-main-page-container">

            {isApproved ?
                <>
                    <div className="responder-features-row">
                        <button onClick={() => { setCurrentMode(features[0]); }}>
                            <Ambulance className="responder-main-page-icon" />
                            <p>Resources</p>
                        </button>
                        <button onClick={() => { setCurrentMode(features[1]); }}>
                            <MapPinned className="responder-main-page-icon" />
                            <p>Disasters</p>
                        </button>
                    </div>

                    <div className="responder-feature-container">
                        {currentMode === features[0] && <MonitorResources />}
                        {currentMode === features[1] && <MonitorDisasters />}
                    </div>
                </> :
                <div className="waiting-container">
                    <Timer/>
                    <div className="line"></div>
                    <p>Hold tight. The user is updating their information to ensure an accurate response.</p>
                </div>
            }
        </div>

    );
}