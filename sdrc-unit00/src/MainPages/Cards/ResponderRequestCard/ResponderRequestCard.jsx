import "./ResponderRequestCard.css";

/*
 { id: 15, 
  name: "Robert Lewis",
   status: "Approved",
    region: "Central",
     phone: "222-111-0000" 
     }
*/

export default function ResponderRequestCard({ data_object }) {
    const { status, name, region, phone, registered_date } = data_object;

    // Safely standardize the status for our logic checks
    const currentStatus = status ? status.toLowerCase() : "";

    const color = () => {
        if (!status) return "";
        if (currentStatus === "approved") return "#21af09";
        return "#db6f00"; // Default for pending
    }

    return (
        <div className="request-card-container">
            <div className="request-status" style={{
                borderColor: color(),
                color: color(),
                boxShadow: `0px 0px 5px ${color()}`
            }}>
                {status}
            </div>

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
                {currentStatus === "pending" && (
                    <>
                        <button className="approve-btn">Approve</button>
                        <button className="reject-btn">Reject</button>
                    </>
                )}
            </div>
        </div>
    );
}