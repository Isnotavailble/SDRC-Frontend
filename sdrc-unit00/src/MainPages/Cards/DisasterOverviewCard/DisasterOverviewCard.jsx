import "../UserOverview/UserOverview.css";
import { Activity, User } from "lucide-react"

export default function DisasterOverviewCard({ disaster_count = 0 }) {
    return (
        <div className="overview-card-container" >
            <div className="icon-row">
                <Activity className="overview-icon" />
                <p className="status-text" >Today Total Incidents</p>

            </div>
            <p className="status-displayed-text">{disaster_count} incidents happend tody.Please go to "disaster" page to view details</p>

        </ div>);
}