import { useEffect, useState } from "react";
import "./RegisterPage.css";
import { User, Phone, UserStar, MapPinned, UserKey, UserLock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { formHandler, postalHandler } from "./HandlerProvider";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../AuthContext/AuthContextProvider";

function RegisterPage() {
    const { setUser } = useAuthContext();
    const [regions, setRegions] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isLogin = localStorage.getItem("user_token") ? true : false;
        setAlreadyLoggedIn(isLogin);
    }, [localStorage.getItem("user_token")]);

    const redirectHandler = () => {
        const paht = localStorage.getItem("user_role") === "responder" ? "/responder/home" : "/admin/overview";
        navigate(paht);
    }
    return (
        <>
            <div className="auth-form-context">
                <form method="POST" className="auth-form-container" onSubmit={(e) => { formHandler(e, { setError, setLoading, navigate,setUser }); }}>
                    <h1>Register</h1>
                    <p style={{ marginTop: "-10px", color: "gray" }}>Create an account to be part of this platform</p>
                    <label>
                        <span><User className="form-icon" /> Username:</span>
                        <input required name="username" type="text" placeholder="Enter username..." />
                    </label>
                    <label>
                        <span><Phone size={20} className="form-icon" /> Phone:</span>
                        <input required name="phonenumber" type="text" placeholder="Enter phone number" />
                    </label>

                    <label>
                        <span><MapPinned className="form-icon" /> Region:</span>
                        <select name="region" onFocus={() => { postalHandler({ loading, setLoading, setRegions, regions }); }} required>
                            {
                                regions?.length > 0 ?
                                    regions.map(
                                        c => <option key={c.region_id} value={c.region_id}>{c.region}</option>
                                    ) :
                                    <option value={""}>select a region</option>
                            }
                        </select>
                    </label>

                    <label>
                        <span> <UserKey className="form-icon" /> Password : </span>
                        <input name="password" autoComplete="off" type="password" required minLength={8} placeholder="Enter password" />
                    </label>
                    <label>
                        <span><UserLock className="form-icon" />Type your password again:</span>
                        {error === "password not match" && <p className="postalcode-loading">{error}</p>}
                        <input name="confirm_password" autoComplete="off" type="password" required minLength={8} placeholder="Enter confirm password" />
                    </label>

                    {loading === "register loading" ?

                        <Loader className="form-icon spinner-animation-icon" /> : alreadyLoggedIn === true ?

                            <div style={{ display: "flex", flexDirection: "row", gap: "5px", marginTop: "10px" }}>
                                <button type={"submit"}>Login</button>
                                <button className="back-button" onClick={() => { redirectHandler(); }}>Back To HomePage</button>
                            </div> :

                            <button type="submit">Register</button>}

                    <p style={{ color: "grey" }}> Already created an account ? </p>
                    <Link style={{ marginTop: "-10px" }} to={"/login"} replace>Login</Link>
                </form>

            </div>
        </>
    )
}
export default RegisterPage;