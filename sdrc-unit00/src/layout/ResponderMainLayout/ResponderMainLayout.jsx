import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import { useEffect } from "react";


export default function ResponderMainLayout() {
    
    useEffect(() => {
        console.log("Page is loaded");
        const is_login = localStorage.getItem("is_login");
        
    }, []);

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}