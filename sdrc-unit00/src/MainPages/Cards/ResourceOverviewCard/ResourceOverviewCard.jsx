import "../UserOverview/UserOverview.css";
import { Container, Hospital, HouseHeart, MapPin, User } from "lucide-react"

export default function ResourceOverviewCard({ resource_count = 0 }) {
    return (
        <div className="overview-card-container">
            <div className="icon-row">
                <MapPin className="overview-icon" />
                <p className="status-text">Resource Places</p>
            </div>
            <p className="status-displayed-text">
                {`Total ${resource_count} resources place (Hospital,Shelter,Supplies) contributed in this region.`}
            </p>
        </div>
    );
}