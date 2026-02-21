import { useState } from "react";
import "./ResourceEditCard.css";

export default function ResourceEditCard({onCancle}) {
    const [text, setText] = useState("");
    return (
        <div className="resource-edit-card-container">
            <h2>Edit Resource</h2>

            <div className="edit-card-first-row">
                <div className="edit-card-first-row-el">
                    <p>Type</p>
                    <select>
                        <option value={"hospital"}>Hospital</option>
                        <option value={"shelter"} >Shelter</option>
                        <option value={"supplies"}>Supplies</option>
                    </select>
                </div>
                <div className="edit-card-first-row-el">
                    <p>Status</p>
                    <select>
                        <option value={"available"}>Available</option>
                        <option value={"unavailable"} >Unavailable</option>
                        <option value={"full"}>Full</option>
                        <option value={"closed"}>Closed</option>
                    </select>
                </div>
                <div className="edit-card-first-row-el">
                    <p>Region</p>
                    <select>
                        <option>Yangon</option>
                        <option>Mandalay</option>
                        <option>UK</option>
                    </select>
                </div>

            </div>

            <div className="edit-card-third-row">
                <p>Location</p>
                <div>
                    <input type="number" placeholder="latitude" min={0} />
                    <input type="number" placeholder="longitude" min={0} />
                </div>
                <p style={{ textAlign: "center" }}>click or drag on map to auto fill</p>
            </div>

            <div className="edit-card-fourth-row">
                <p>{`contact info(${text.length > 0 ? text.length : 0}/150) `}</p>
                <textarea placeholder="Type info here" rows={5} maxLength={150} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="edit-card-fifth-row">
                <button>Confirm</button>
                <button onClick={() => onCancle()}>Cancel</button>
            </div>
        </div>
    );
}