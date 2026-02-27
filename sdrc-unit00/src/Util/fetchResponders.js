import axios from "axios";
import { getRegions } from "./fetchPostalCode";
import { timeAgo } from "./timeUnitConverter";

/*
 {

id: 15, 
  
name: "Robert Lewis",
   
status: "Approved",
    
region: "Central",
     
phone: "222-111-0000" 
     
}
*/

export async function getAllResponders({ setError, setLoading, setResponders }) {
    try {
        setLoading("getting responders");
        const token = localStorage.getItem("user_token");
        const res = await axios.get("http://localhost:8080/api/v1/users/responders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        //converter
        const data = res.data.data.items.map((r, i) => ({
            "id": r.id,
            "name": r.full_name,
            "phone": r.phone_number,
            "region": getRegions().find(region => region.region_id === r.region_id).region,
            "status": r.is_approved ? "Approved" : "Pending",
            "registered_date" : r.created_at,
            "time": timeAgo(r.created_at),
        }));

        console.log("data", data);
        setResponders(data);
        setError(null);
        setLoading(null);
    }
    catch (error) {
        console.error("error", error);
        setError("Something was wrong");
        setLoading(null);
    }

}