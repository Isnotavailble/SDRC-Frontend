import { Link, Navigate, Route, useLocation, useNavigate } from "react-router-dom";
import RegisterStyleProvider from "../RegisterPage/RegisterStyleProvider";
import { Loader, Phone, UserKey } from "lucide-react";
import { useEffect, useState } from "react";
import { loginFormHandler } from "./HandlerProvider";
import "./LoginPage.css";
import { useAuthContext } from "../AuthContext/AuthContextProvider";
/*simulated design*/
function LoginPage() {
    const {user,setUser} = useAuthContext();
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isLogin = localStorage.getItem("user_token") ? true : false;
        setAlreadyLoggedIn(isLogin);
    }, [localStorage.getItem("user_token")]);

    const redirectHandler = () => {
        const userRole = JSON.parse(localStorage.getItem("user"))?.role;
        const path = userRole === "responder" ? "/responder/home" : "/admin/overview";
        navigate(path);
    }
    return (
        <>
            <RegisterStyleProvider>
                <div className="auth-form-context">
                    <form method="POST" className="auth-form-container login-form-container" onSubmit={(e) => { loginFormHandler({ e, setLoading, setError, navigate,setUser }); }}>

                        <h1>Login</h1>
                        <p style={{ color: "gray", marginTop: "-4px" }}>Please fill your crendetails correctly</p>

                        <label>
                            <span><Phone className="form-icon" /> Phone number : </span>
                            <input type="text" placeholder="Enter your phone number .." name="phonenumber" required />
                        </label>

                        <label>
                            <span>  <UserKey className="form-icon" />Password : </span>
                            {error === "wrong password" && <p style={{ color: "#e62525" }} className="postalcode-loading">Wrong Password</p>}
                            <input required autoComplete={"off"} type="password" placeholder="Enter your password" name="password" minLength={8} />
                        </label>

                        {error && <p style={{ color: "#e62525" }}>{error}</p>}

                        { /*nested condition read this carefully*/
                            loading === "login process" ?
                                <Loader className="form-icon spinner-animation-icon" /> :
                                alreadyLoggedIn === true ?
                                    <div style={{ display: "flex", flexDirection: "row", gap: "5px", marginTop: "10px" }}>
                                        <button type={"submit"}>Login</button>
                                        <button className="back-button" onClick={() => { redirectHandler(); }}>Back To Centre</button>
                                    </div> :

                                    <button type={"submit"}>Login</button>
                        }
                        <p style={{ color: "gray" }}>Don't have an account</p>
                        <Link to={"/register"} replace>Register</Link>
                    </form>
                </div>

            </RegisterStyleProvider>

        </>
    )
}
export default LoginPage;