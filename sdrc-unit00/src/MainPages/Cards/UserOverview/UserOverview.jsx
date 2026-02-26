import "./UserOverview.css";
import { User } from "lucide-react"

export default function UserOverviewCard({ status = "approved", users_count = 0 }) {
    const isApproved = status.toLocaleLowerCase() === "approved";
    const green = "#2eb816";
    const orange = "#db6f00"
    return (
        <div className="overview-card-container" >
            <div className="icon-row">
                <User className="overview-icon" />
                <p className="status-text" >{status} reponders</p>

            </div>

            {!isApproved && <p className="status-displayed-text">{`${users_count} users await your approval.Please review their infomartion`}</p>}
            {isApproved && <p className="status-displayed-text">{`${users_count} approved users are using this system.`}</p>}
        </ div>);
}