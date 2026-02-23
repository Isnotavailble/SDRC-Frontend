import { LayoutPanelLeft, MapPin, Users,Send, MapPinned } from "lucide-react";
import "./SideNavBar.css";
import { Link } from "react-router-dom";
export default function SideNavBar() {
    return (
        <div className="side-nav-container" >
            
            <Link to={"/admin/overview"}><LayoutPanelLeft className="side-nav-icon" />Overview</Link>
            <Link to={"/admin/responders"}><Users className="side-nav-icon"/>Responders</Link>
            <Link to={"/admin/disasters"}><MapPinned className="side-nav-icon"/>Disasters</Link>
            <Link to={"/admin/alerts"}><Send className="side-nav-icon"/>Send Alert</Link>
        </div>
    );
}