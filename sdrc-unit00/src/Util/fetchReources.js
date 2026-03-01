import axios from "axios";

export async function fetchAllResources({ setLoading, setrror, setResources }) {

    try {

        const token = localStorage.getItem("user_token");
        const res = await axios.get("http://localhost:8080/api/v1/resources", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setResources(res.data.data);
    }
    catch (error) {
        console.error("Error", error);

    }
}
/*{
            "id": "677798df-206f-4f8a-8d91-c55700f02e61",
            "resource_name": "Community Shelter B",
            "resource_type": "shelter",
            "contact_info": "+959100000002",
            "status": "Available",
            "region_id": "19c92ff8-b996-41df-8d27-e21da8c9d377",
            "region": "နေပြည်တော် (ပြည်ထောင်စုနယ်မြေ)",
            "latitude": 16.8835,
            "longitude": 96.166,
            "created_by": "95037c54-a5cd-459a-8678-b0dbb81e9f07",
            "updated_by": "95037c54-a5cd-459a-8678-b0dbb81e9f07",
            "created_at": "2026-02-26T01:56:13.446841+06:30",
            "updated_at": "2026-02-26T01:56:13.446841+06:30"
        }

*/
//add new resources
export async function addResource({ data, setResources }) {

    try {
        /*
        backup clean up code if server not trim the string

        const cleanedData = {
            ...data,
            resource_name : data.resource_name.trim(),
            resource_type : data.resource_type.trim(),
            contact_info : data.contact_info.trim(),
        }*/

        const token = localStorage.getItem("user_token");
        const res = await axios.post("http://localhost:8080/api/v1/resources", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.status === 201) {
            console.log("resource created", res.data);
            setResources(p => [...p, res.data.data]);
        }
    }
    catch (error) {
        console.error("Error", error);
        return false;
    }
}
//delete 
export async function deleteResource({ data, setResources }) {
    try {
        const token = localStorage.getItem("user_token");
        const res = await axios.delete(`http://localhost:8080/api/v1/resources/${data.id}`, { headers: { Authorization: `Bearer ${token}` } });
        setResources(p => p.filter(r => r.id !== data.id));
    }
    catch (error) {
        console.log("error", error);
    }
}

//update 
export async function updateResource({ data, setResources, setLoading, setError }) {
    const { contact_info, latitude, longitude, resource_name, resource_type, region, status } = data;
    try {
        setLoading(true);
        console.log("data to be update", data);
        const token = localStorage.getItem("user_token");
        const res = await axios.put(`http://localhost:8080/api/v1/resources/${data.id}`, {
            resource_name: resource_name,
            resource_type: resource_type,
            latitude: latitude,
            longitude: longitude,
            contact_info: contact_info,
            status: status,
            region: region
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("data updated : ", res.data.data);
        setResources(p => p.map(r => {
            if (r.id === data.id)
                return res.data.data
            return r
        }));
        setLoading(null);
        return true;
    }
    catch (error) {
        console.error("Error", error);
        setLoading(null)
        setError(true);
        return false;
    }
}