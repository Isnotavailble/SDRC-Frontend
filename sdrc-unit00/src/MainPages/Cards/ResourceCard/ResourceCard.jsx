import { Container, Hospital, HouseHeart } from "lucide-react";
import "./ResourceCard.css";
import { timeAgo } from "../../../Util/timeUnitConverter";

// 🛑 Notice: No more useState in here! It strictly uses the props.
export default function ResourceCard({ viewHandler, data_object, onEdit, onDelete }) {
    const { status, resource_type, resource_name, region, contact_info } = data_object;

    const getColor = () => {
        if (!status) return "";
        const lowerStatus = status.toLowerCase();
        if (lowerStatus === "available") return "#21af09";
        if (lowerStatus === "unavailable" || lowerStatus === "closed") return "#e62525";
        return "#db6f00";
    };

    const cardColor = getColor();
    const role = JSON.parse(localStorage.getItem("user")).role;
    return (
        <div className={`resource-card-container`} >
            <div className="resource-status" style={{
                borderColor: cardColor,
                color: cardColor,
                boxShadow: `0px 0px 3px ${cardColor}`
            }}>{status}</div>
            <p className="time-label">{timeAgo(data_object.created_at)}</p>
            <div className="resource-type-row">
                {resource_type === "hospital" && <Hospital className="resource-icon" />}
                {resource_type === "shelter" && <HouseHeart className="resource-icon" />}
                {resource_type === "supplies" && <Container className="resource-icon" />}
                <h3>{resource_type}</h3>
            </div>


            <p className="resource-text">{resource_name}</p>
            <div className="line"></div>

            <h3 className="resource-subheader">Location</h3>
            <p className="resource-text">{region}</p>

            <h3 className="resource-subheader">Info</h3>

            <p className="resource-text" >{contact_info}</p>



            {role === "responder" &&

                <div className="resource-card-buttons">
                    <button onClick={viewHandler}>view</button>
                    <button onClick={onEdit}>update</button>
                    <button onClick={() => onDelete(data_object)}>delete</button>
                </div>
            }
        </div>
    );
}