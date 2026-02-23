import { CircleUserRound, HeartCrack, HeartPulse, Menu } from "lucide-react";
import "./Header.css";

//update : menu button has been removed
function Header({ name, role }) {
    return (
        <div className="header-container" style={{ position: role === "admin" ? "fixed" : "absolute" }} >
            {/*left side menu,webname*/}
            <div className="header-left">
                <h1>Artificial Punks</h1>
            </div>
            {/*right side team name*/}
            <div className="header-right">
                {
                    role === "admin" ?
                        <>
                            <CircleUserRound className="header-team-icon" strokeWidth={1.8} />
                            <h1>{name || "Admin"}</h1>
                        </>
                        :
                        <>
                            <HeartPulse className="header-team-icon" strokeWidth={1.8} />
                            <h1>{name || "Teanname"}</h1>
                        </>
                }
            </div>

        </div>
    );
}
export default Header;