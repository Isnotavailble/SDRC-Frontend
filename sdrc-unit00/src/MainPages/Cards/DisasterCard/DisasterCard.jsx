import { Activity, Wind, Waves } from "lucide-react";
import "./DisasterCard.css";
import { useEffect, useState } from "react";

export default function DisasterCard({ viewHandler, data_object }) {
    const { type, severity, severityValue, happened_at, location, time } = data_object;
    const [approved, setApproved] = useState(false);
    const color = () => {
        if (!severity) return "";
        if (severity.toLowerCase() === "low") return "#21af09";
        if (severity.toLowerCase() === "high") return "#e62525";
        return "#db6f00";
    }
    useEffect(() => { console.log("data loaded ", data_object); }, []);

    return (
        <div className="disaster-card-container">
            {/* Placed first for absolute positioning, perfectly matching your CSS */}
            <div className="disaster-severity-badge" style={{ borderColor: color(), color: color(), boxShadow: "0px 0px 3px " + color() }}>
                {approved ? "Approved" : "pending"}
            </div>
            <div className="disaster-type-row">
                {type.toLowerCase() === "earthquake" && <Activity className="disaster-icon" />}
                {type.toLowerCase() === "storm" && <Wind className="disaster-icon" />}
                {type.toLowerCase() === "flood" && <Waves className="disaster-icon" />}
                <h3>{type}</h3>
            </div>

            <div className="disaster-content">
                <p className="disaster-text">Severity : {severityValue}</p>
                <p className="disaster-text">Happened at : {happened_at}</p>
                <p className="disaster-text">Location : {location}</p>
            </div>

            <div className="disaster-card-buttons">
                <button onClick={() => { setApproved(true); viewHandler && viewHandler(data_object); }}>view</button>
            </div>
        </div>
    );
}
