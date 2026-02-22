import { useEffect, useState } from "react";
import "./ResourceEditCard.css";

//This Component is for editing the card so edit and add is the same in purpose of this comp
export default function ResourceEditCard({ data_object, onCancle, openAddOption, onComfirn, selectedGeoPoint }) {
    const [text, setText] = useState("");
    /*
    format 
         {
            type: "hospital",
            name: "My TownShit",
            status: "closed",
            location: "",
            lat: 0,
            lon: 0, // General Yangon coordinates
            info: ""
        }
    
    */
    useEffect(() => {
        console.log("data received", data_object);
    }, []);

    const [inputData, setInputData] = useState({
        type: data_object?.type || "hospital",
        name: data_object?.name || "",
        status: data_object?.status || "available",
        location: data_object?.location || "",
        lat: data_object?.lat || 0,
        lon: data_object?.lon || 0,
        info: data_object?.info || ""
    });
    useEffect(() => {

        if (selectedGeoPoint) {
            setInputData(p => ({ ...p, lat: selectedGeoPoint.lat, lon: selectedGeoPoint.lon }))
        }
    }, [selectedGeoPoint]);


    return (
        <div className="resource-edit-card-container">
            <h2>{openAddOption === true ? "Create Resource" : "Edit Resource"}</h2>

            <div className="edit-card-first-row">
                <div className="edit-card-first-row-el">
                    <p>Type</p>
                    <select defaultValue={inputData.type} onChange={(e) => { setInputData(p => ({ ...p, type: e.target.value })); }}>
                        <option value={"hospital"} >Hospital</option>
                        <option value={"shelter"}  >Shelter</option>
                        <option value={"supplies"}>Supplies</option>
                    </select>
                </div>
                <div className="edit-card-first-row-el">
                    <p>Status</p>
                    <select defaultValue={inputData.status} onChange={(e) => { setInputData(p => ({ ...p, status: e.target.value })) }}>
                        <option value={"available"}>Available</option>
                        <option value={"unavailable"} >Unavailable</option>
                        <option value={"full"}>Full</option>
                        <option value={"closed"}>Closed</option>
                    </select>
                </div>
                <div className="edit-card-first-row-el">
                    <p>Region</p>
                    <select defaultValue={inputData.location} onChange={(e) => { setInputData(p => ({ ...p, locaiton: e.target.value })) }}>
                        <option>Yangon</option>
                        <option>Mandalay</option>
                        <option>UK</option>
                    </select>
                </div>

            </div>

            <div className="edit-card-second-row">
                <p>Resource Name</p>
                <input value={inputData.name} placeholder="Enter Resource name ..." type="text" onChange={(e) => { setInputData(p => ({ ...p, name: e.target.value.trim() })) }} />
            </div>

            <div className="edit-card-third-row">
                <p>Location</p>
                <div>
                    <input type="number" placeholder="latitude" value={inputData.lat} onChange={(e) => { setInputData((p) => ({ ...p, lat: e.target.value })) }} />
                    <input type="number" placeholder="longitude" value={inputData.lon} onChange={(e) => { setInputData((p) => ({ ...p, lon: e.target.value })) }} />
                </div>
                <p style={{ textAlign: "center" }}>click or drag on map to auto fill</p>
            </div>

            <div className="edit-card-fourth-row">
                <p>{`contact info(${inputData.info.length > 0 ? inputData.info.length : 0}/150) `}</p>
                <textarea placeholder="Type info here" rows={5} maxLength={150} value={inputData.info} onChange={(e) => setInputData(p => ({ ...p, info: e.target.value }))} />
            </div>
            <div className="edit-card-fifth-row">
                <button onClick={() => onComfirn()}>Confirm</button>
                <button onClick={() => onCancle()}>Cancel</button>
            </div>
        </div>
    );
}