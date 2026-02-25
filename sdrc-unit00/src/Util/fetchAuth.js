import axios from "axios";

export async function doRegister(data_object, setLoading, setError) {
    try {
        setLoading("register loading");
        const res = await axios.post("http://localhost:8080/api/v1/auth/register", data_object);
        console.log("acc complete");
        localStorage.setItem("user_token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        setLoading(null);
        return true;

    }
    catch (error) {
        console.log("Error", error.message);
        if (error.response.data.message.includes("duplicate key")) {
            setError("Already exist")
        }
        return false
    }
}

export async function doLogin(phonenumber, password, setLoading, setError) {
    try {
        setLoading("loading process");
        const response = await axios.post("http://localhost:8080/api/v1/auth/login", {
            "phone_number": phonenumber,
            "password": password
        });
        const user = JSON.stringify(response.data.data.user);
        console.log("login response", response.status);
        localStorage.setItem("user_token", response.data.data.token);
        localStorage.setItem("user", user);
        setLoading(null);
        return response.data.data;
    } catch (error) {
        console.error("Login error:", error);
        if (error.response.data.message === "invalid phone number or password") {
            setError(error.response.data.message);
            setLoading(null);
        }
        return null;

    }
}