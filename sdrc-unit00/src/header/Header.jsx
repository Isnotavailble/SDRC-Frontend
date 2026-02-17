import { HeartCrack, HeartPulse, Menu } from "lucide-react";
import "./Header.css";
function Header({ team }) {
    return (
        <div className="header-container">
            {/*left side menu,webname*/}
            <div className="header-left">
                <Menu />
                <h1>Artificial Punks</h1>
            </div>
            {/*right side team name*/}
            <div className="header-right">
                <HeartPulse />
                <h1>{team || "Unknown"}</h1>
            </div>

        </div>
    );
}
export default Header;