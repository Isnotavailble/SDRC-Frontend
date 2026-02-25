import axios from "axios";
export async function approveResponder({ responder_id, setLoading, setError }) {
    try {
        setLoading("approving responder");
        const token = localStorage.getItem("user_token");
        const res = await axios.patch(`http://localhost:8080/api/v1/users/${responder_id}/approve`, {}, {

            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("responder approved", res.data);
        setLoading(null);
        setError(null);
        return true;

    }
    catch (error) {
        console.error("Error", error);
        setLoading("Could not Approved the user");
        return false
    }
}