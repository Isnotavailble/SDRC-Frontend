import { useEffect, useState } from "react";
import "./ResponderRequestCard.css";

/*
 { id: 15, 
  name: "Robert Lewis",
   status: "Approved",
    region: "Central",
     phone: "222-111-0000" 
     }
*/

export default function ResponderRequestCard({ data_object, onApproved }) {
    const { id, status, name, region, phone, registered_date, time } = data_object;
    const isApproved = status.toLowerCase() === "approved";

    return (
        <div className="request-card-container">
            <div className="request-status" style={{
                borderColor: isApproved ? "#21af09" : "#db6f00",
                color: isApproved ? "#21af09" : "#db6f00",
                boxShadow: `0px 0px 5px ${isApproved ? "#21af09" : "#db6f00"}`
            }}>
                {isApproved ? "Approved" : "Pending"}
            </div>
            <p className="time-label" style={{ right: "1px" }}>{time}</p>

            <p>responder's name</p>
            <h3>{name || "Unknown"}</h3>

            <p>registered location</p>
            <h3>{region || "Unknown"}</h3>

            <p>Phone number</p>
            <h3>{phone || "Unknown"}</h3>

            <p>registered date</p>
            {/* Safely check if date exists before parsing it */}
            <h3>{registered_date ? new Date(registered_date).toDateString() : "Unknown"}</h3>

            <div className="button-row">
                {/* 1. Show both Approve and Reject for Pending requests */}
                {!isApproved && (
                    <>
                        <button className="approve-btn" onClick={() => {
                            const s = onApproved(id);
                        }}>Approve</button>
                    </>
                )}
            </div>
        </div >
    );
}