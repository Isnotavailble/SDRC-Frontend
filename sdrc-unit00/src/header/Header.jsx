import { LogOut, Menu } from "lucide-react";
import "./Header.css";
import page_icon from "../assets/tree.svg";
//update : menu button has been removed
function Header({ role, targetRef, mainContentRef }) {
    const menuHandler = () => {
        if (targetRef.current && mainContentRef.current) {
            if (targetRef.current.style.width === "130px") {
                targetRef.current.style.width = "0px";
                targetRef.current.style.padding = "0px";
                mainContentRef.current.style.marginLeft = "0px";

            } else {
                targetRef.current.style.width = "130px";
                targetRef.current.style.paddingLeft = "10px";
                targetRef.current.style.paddingRight = "14px";
                mainContentRef.current.style.marginLeft = "160px";
            }
        }
    };
    return (
        <div className="header-container" style={{ position: role === "admin" ? "fixed" : "absolute" }} >
            {/*left side menu,webname*/}
            <div className="header-left">
                {localStorage.getItem("user_role") === "admin" && <button className="header-menu-icon" onClick={() => menuHandler()}><Menu /></button>}
                <img src={page_icon} className="page_icon" alt="Thik Pin Logo" />
                <h1>Thik Pin</h1>
            </div>
            {/*right side team name*/}
            <button className="header-right" onClick={() => { localStorage.setItem("user_role", ""); localStorage.setItem("is_login", "false"); }}>
                Logout <LogOut size={18} />

            </button>

        </div>
    );
}
export default Header;