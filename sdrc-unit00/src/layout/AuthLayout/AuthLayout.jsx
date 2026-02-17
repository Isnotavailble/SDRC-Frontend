import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
    useEffect(() => {console.log("layout loaded")},[])
    return (
        <>
            <Outlet />
        </>
    )

}
export default AuthLayout;