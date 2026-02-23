import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import { useEffect, useRef } from "react";
import SideNavBar from "../../SideNav/SideNavBar";
import "./AdminLayout.css";
export default function AdminLayout() {
    const sideNavRef = useRef({});
    useEffect(() => {
        console.log("Page is loaded")
        console.log(sideNavRef.current)
    }, []);

    return (
        <>

            <Header role={"admin"} name={"Kaung Cow"} targetRef={sideNavRef}/>
            <SideNavBar ref={sideNavRef}/>
            <div className="admin-layout-content">
                <Outlet />
            </div>


        </>
    );
}