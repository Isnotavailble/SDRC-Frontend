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
    const color = () => {
        if (!status) return "";
        if (status.toLowerCase() === "approved") return "#21af09";
        if (status.toLowerCase() === "rejected") return "#e62525";
        return "#db6f00";
    }
    return (
        <div className="request-card-container">
            <div className="request-status" style={{ borderColor: color(), color: color() }}>{status}</div>
            <p>responder's name</p>
            <h3>{name || "Unknown"}</h3>

            <p>registered location</p>
            <h3>{region || "Unknown"}</h3>

            <p>Phone number</p>
            <h3>{phone || "Unknown"}</h3>

            <p>registered date</p>
            <h3>{new Date(registered_date).toDateString() || "Unknown"}</h3>
            <div className="button-row">
                <button>Approved</button>
                <button>Rejected</button>
            </div>
        </div>
    );
}