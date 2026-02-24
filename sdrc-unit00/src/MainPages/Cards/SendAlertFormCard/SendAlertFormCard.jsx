import { Send } from "lucide-react";
import "./SendAlertFormCard.css";
import { useState } from "react";
export default function SendAlertFormCard() {
    const [text,setText] = useState("");
    return (
        <div className="alert-form-container">
            <h3>Alert</h3>
            <div className="line" style={{ width: "70px" }}></div>
            <div className="alert-form-first-row">
                <div>
                    <p>Disaster Type</p>
                    <select>
                        <option value={"earthquake"}>Earthquake</option>
                    </select>

                </div>

                <div>
                    <p>Serverity Level</p>
                    <select>
                        <option value={"low"}>Low</option>
                        <option value={"medium"}>Medium</option>
                        <option value={"high"}>High</option>
                    </select>
                </div>
            </div>
            <div className="alert-form-second-row">

                <div>
                    <p>Target Users</p>
                    <select>
                        <option value={"citizens"}>Citizens</option>
                        <option value={"responders"}>Responders</option>
                        <option value={"both"}>Both</option>
                    </select>
                </div>

                <div>
                    <p>Target Region</p>
                    <select>
                        <option value={"yangon"}>Yangon</option>
                        <option value={"mandalay"}>Mandalay</option>
                        <option value={"naypyitaw"}>Naypyitaw</option>
                    </select>
                </div>

            </div>
            <div className="alert-form-third-row">
                <p>Alert Expired Date</p>
                <input type="date" placeholder="YYY-MMM-DDD" />
            </div>
            <div className="alert-form-fouth-row">
                <div>
                    <p>Message {`characters ${text.length}/150`}</p>
                    <textarea rows={5} placeholder="Type alert message ..." maxLength={150} value={text} onChange={(e) => setText(e.target.value)} />
                </div>
            </div>
            <div className="alert-form-fifth-row">
                <button className="send-alert-btn"><Send size={24} /> Send Alert</button>
            </div>





        </div>);
}