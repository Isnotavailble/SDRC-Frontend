

import { useNavigate } from "react-router-dom";
import { doLogin } from "../Util/fetchAuth";

export async function loginFormHandler({ setError, e, setLoading, navigate }) {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    if (data["phonenumber"].trim() === localStorage.getItem("user_phone")) {
        console.log("Already log in this account");
        setError("already login this account");
        return;
    }
    setLoading("login process");
    const response = await doLogin();

    setError(null);
    setLoading(null);
    localStorage.setItem("user_phone", data["phonenumber"]);
    localStorage.setItem("is_login", "true");
    localStorage.setItem("user_role", response.role);
    navigate("/responder/centre");
    return "ok"
}
