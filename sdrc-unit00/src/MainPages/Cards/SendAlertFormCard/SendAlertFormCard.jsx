import { Send } from "lucide-react";
import "./SendAlertFormCard.css";
import { useState } from "react";
import { getRegions } from "../../../Util/fetchPostalCode";
import axios from "axios";

export default function SendAlertFormCard() {
    // 1. Setup state for all form fields, with default values
    const [formData, setFormData] = useState({
        incident_type: "earthquake",
        severity: "low",
        audience: "citizen",
        target_region: getRegions()[0]?.region || "", // Default to the first region in the list
        expires_at: "",
        message: ""
    });

    // 2. Generic handler to update state when any input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // 3. Handle the submission and API request
    const handleSubmit = async () => {
        // Basic validation
        if (!formData.expires_at || !formData.message) {
            alert("Please fill out the expiration date and message.");
            return;
        }

        try {
            // Convert local datetime to ISO 8601 UTC format
            const formattedDate = new Date(formData.expires_at).toISOString();

            // Build the payload
            const payload = {
                incident_type: formData.incident_type,
                severity: formData.severity,
                audience: formData.audience,
                target_region: formData.target_region,
                message: formData.message,
                expires_at: formattedDate
            };

            // Send the POST request using axios
            const response = await axios.post(
                "http://localhost:8080/api/v1/alerts",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("user_token")}`
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                alert("Alert sent successfully!");
                console.log("alert", payload)
                // Optional: Clear form here if needed
            } else {
                console.error("Server Error:", response.data);
                alert("Failed to send alert. Check console for details.");
            }
        } catch (error) {
            if (error.response) {
                console.error("Server Error:", error.response.data);
                alert("Failed to send alert. Check console for details.");
            } else {
                console.error("Network Error:", error);
                alert("Network error. Is your backend running?");
            }
        }
    };

    return (
        <div className="alert-form-container">
            <h3>Alert</h3>
            <div className="line" style={{ width: "70px" }}></div>

            <div className="alert-form-first-row">
                <div>
                    <p>Disaster Type</p>
                    <select name="incident_type" value={formData.incident_type} onChange={handleChange}>
                        <option value="earthquake">Earthquake</option>
                    </select>
                </div>

                <div>
                    <p>Severity Level</p>
                    <select name="severity" value={formData.severity} onChange={handleChange}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>

            <div className="alert-form-second-row">
                <div>
                    <p>Target Users</p>
                    <select name="audience" value={formData.audience} onChange={handleChange}>
                        <option value="citizen">Citizen</option>
                        <option value="responder">Responder</option>
                        <option value="both">Both</option>
                    </select>
                </div>

                <div>
                    <p>Target Region</p>
                    <select name="target_region" value={formData.target_region} onChange={handleChange}>
                        {getRegions().map((o) => (
                            <option key={o.region_id} value={o.region}>
                                {o.region}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="alert-form-third-row">
                <p>Alert Expired Date</p>
                <input
                    type="datetime-local"
                    name="expires_at"
                    value={formData.expires_at}
                    onChange={handleChange}
                />
            </div>

            <div className="alert-form-fouth-row">
                <div>
                    <p>Message {`characters ${formData.message.length}/150`}</p>
                    <textarea
                        rows={5}
                        placeholder="Type alert message ..."
                        maxLength={150}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="alert-form-fifth-row">
                <button className="send-alert-btn" onClick={handleSubmit}>
                    <Send size={24} /> Send Alert
                </button>
            </div>
        </div>
    );
}