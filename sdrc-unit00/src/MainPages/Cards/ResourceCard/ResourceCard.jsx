import { Container, Hospital, HouseHeart } from "lucide-react";
import "./ResourceCard.css";
/*
expected json format
{
    type: "hospital",
    name: "My TownShit",
    status: "closed",
    location: "yangon",
    lat: 16.8053,
    lon: 96.1561, // General Yangon coordinates
    info: "This place is so good that everyone respect the it by not giving a shit"
}
*/

export default function ResourceCard({ viewHandler, data_object, onEdit,card_id }) {
    const { status, type, name, location, info } = data_object;

    const color = () => {
        if (!status) return "";
        if (status.toLowerCase() === "available")
            return "#21af09";
        else if (status.toLowerCase() === "unavailable" || status.toLowerCase() === "closed")
            return "#e62525";
        return "#db6f00";
    }
    const buttons = ["view", "update", "delete"];

    return (
        <div className={`resource-card-container`}>
            <div className="resource-status" style={{ borderColor: color(), color: color(), boxShadow: "0px 0px 3px " + color() }} >{status}</div>
            <div className="resource-type-row">
                {type === "hospital" && <Hospital className="resource-icon" />}
                {type === "shelter" && <HouseHeart className="resource-icon" />}
                {type === "supplies" && <Container className="resource-icon" />}
                <h3>{type}</h3>
            </div>
            <p className="resource-text">{name}</p>
            <div className="line"></div>

            <h3 className="resource-subheader">Location</h3>
            <p className="resource-text">{location}</p>

            <h3 className="resource-subheader">Info</h3>
            <p className="resource-text">{info}</p>

            <div className="resource-card-buttons">
                <button onClick={() => { viewHandler(); }}>view</button>
                <button onClick={() => { onEdit(); }}>update</button>
                <button>delete</button>
            </div>
        </div>
    );
}
