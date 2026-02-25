import { useEffect, useState } from "react";
import "./ResourceEditCard.css";
import { getRegions } from "../../../Util/fetchPostalCode";

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
        id: data_object?.id || null,
        resource_type: data_object?.resource_type || "hospital",
        resource_name: data_object?.resource_name || "",
        status: data_object?.status || "Available",
        region: getRegions()[0].region,
        latitude: data_object?.latitude || 0,
        longitude: data_object?.longitude || 0,
        contact_info: data_object?.contact_info || ""
    });
    useEffect(() => {

        if (selectedGeoPoint) {
            setInputData(p => ({ ...p, latitude: selectedGeoPoint.latitude, longitude: selectedGeoPoint.longitude }))
        }
    }, [selectedGeoPoint]);


    return (
        <div className="resource-edit-card-container">
            <h2>{openAddOption === true ? "Create Resource" : "Edit Resource"}</h2>

            <div className="edit-card-first-row">
                <div className="edit-card-first-row-el">
                    <p>Type</p>
                    <select defaultValue={inputData.type} onChange={(e) => { setInputData(p => ({ ...p, resource_type: e.target.value })); }}>

                        <option value={"hospital"} >Hospital</option>
                        <option value={"shelter"}  >Shelter</option>
                        <option value={"supplies"}>Supplies</option>
                    </select>
                </div>
                <div className="edit-card-first-row-el">
                    <p>Status</p>
                    <select defaultValue={inputData.status} onChange={(e) => { setInputData(p => ({ ...p, status: e.target.value })) }}>
                        <option value={"Available"}>Available</option>
                        <option value={"Unavailable"} >Unavailable</option>
                        <option value={"Full"}>Full</option>
                        <option value={"Closed"}>Closed</option>
                    </select>
                </div>
                <div className="edit-card-first-row-el">
                    <p>Region</p>
                    <select defaultValue={getRegions()[0].region} onChange={(e) => { setInputData(p => ({ ...p, region: e.target.value })) }}>
                        {getRegions().map((c, i) =>
                            <option value={c.region} key={c.region_id}>{c.region}</option>)
                        }
                    </select>
                </div>

            </div>

            <div className="edit-card-second-row">
                <p>Resource Name</p>
                <input value={inputData.resource_name} placeholder="Enter Resource name ..." type="text" onChange={(e) => { setInputData(p => ({ ...p, resource_name: e.target.value.trim() })) }} />
            </div>

            <div className="edit-card-third-row">
                <p>Location</p>
                <div>
                    <input type="number" placeholder="latitude" value={inputData.latitude} onChange={(e) => { setInputData((p) => ({ ...p, latitude: e.target.value })) }} />
                    <input type="number" placeholder="longitude" value={inputData.longitude} onChange={(e) => { setInputData((p) => ({ ...p, longitude: e.target.value })) }} />
                </div>
                <p style={{ textAlign: "center" }}>click or drag on map to auto fill</p>
            </div>

            <div className="edit-card-fourth-row">
                <p>{`contact info(${inputData.contact_info.length > 0 ? inputData.contact_info.length : 0}/150) `}</p>
                <textarea placeholder="Type info here" rows={5} maxLength={150} value={inputData.contact_info} onChange={(e) => setInputData(p => ({ ...p, contact_info: e.target.value }))} />
            </div>
            <div className="edit-card-fifth-row">
                <button onClick={() => onComfirn(inputData)}>Confirm</button>
                <button onClick={() => onCancle()}>Cancel</button>
            </div>
        </div>
    );
}