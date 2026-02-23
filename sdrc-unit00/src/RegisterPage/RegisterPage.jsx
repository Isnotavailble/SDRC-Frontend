import { useEffect, useState } from "react";
import "./RegisterPage.css";
import { User, Phone, UserStar, MapPinned, UserKey, UserLock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { formHandler, postalHandler } from "./HandlerProvider";
import { useNavigate } from "react-router-dom";

function RegisterPage() {

    const [postalCodes, setPostalCodes] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setAlreadyLoggedIn(localStorage.getItem("is_login") === "true" ? true : false);
    }, []);
    const redirectHandler = () => {
        const paht = localStorage.getItem("user_role") === "responder" ? "/responder/home" : "/admin/overview";
        navigate(paht);
    }
    return (
        <>
            <div className="auth-form-context">
                <form method="POST" className="auth-form-container" onSubmit={(e) => { formHandler(e, { setError, setLoading, navigate }); }}>
                    <h1>Register</h1>
                    <p style={{ marginTop: "-10px", color: "gray" }}>Create an account to be part of this platform</p>
                    <label>
                        <span><User className="form-icon" /> Username:</span> <input required name="username" type="text" placeholder="Enter username..." />
                    </label>
                    <label>
                        <span><Phone size={20} className="form-icon" /> Phone:</span>   <input required name="phonenumber" type="text" placeholder="Enter phone number" />
                    </label>
                    <div className="option-row">
                        <label>
                            <span><UserStar className="form-icon" /> Role:</span>
                            <select name="role" required>
                                <option value="responder">responder</option>
                            </select>
                        </label>
                        <label>
                            <span><MapPinned className="form-icon" /> Postal Code:</span>
                            {loading === "postal_code" && <p className="postalcode-loading">loading ...</p>}
                            <select name="postal_code" onFocus={() => { postalHandler({ loading, setLoading, postalCodes, setPostalCodes }); }} required>
                                {
                                    postalCodes?.length > 0 ?
                                        postalCodes.map(
                                            c => <option key={c} value={c}>{c}</option>
                                        ) :
                                        <option value={""}>postal code</option>
                                }
                            </select>
                        </label>
                    </div>
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
                                <button className="back-button" onClick={() => { redirectHandler(); }}>Back To Centre</button>
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