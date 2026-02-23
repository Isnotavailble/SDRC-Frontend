import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import { useEffect } from "react";

export default function ResponderMainLayout() {
    return (
        <>
            <Header role={"responder"} />
            <Outlet />

        </>
    );
}