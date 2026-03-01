import axios from "axios";

export async function fetchAllDisaster() {

    try {
        const page_count = 10;
        const response_list_id = [];
        let response_list = [];
        for (let page = 1 ; page < 10 ; page++){


        const res = await axios.get(`http://localhost:8080/api/v1/incidents?page=${page}&page_size=5`, {headers :{Authorization : `Bearer ${localStorage.getItem("user_token")}`}});
        console.log("res", res);
        if (res.data.data?.items?.length === 0)
                break;
            res.data.data.items.forEach((item) => {response_list_id.push(item.unified_event_id)});
        }

        for (let id in response_list_id){
            const res = await axios.get(`http://localhost:8080/api/v1/incidents/${response_list_id[id]}`, {headers :{Authorization : `Bearer ${localStorage.getItem("user_token")}`}});
            console.log("res detail", res.data.data.raw_reports);

            response_list.push(res.data.data.raw_reports[0]);
        }
        /*

        {
    "raw_reports": [
        {
            "id": "e752d0c4-4ad9-4bf6-b922-4186447b5d8d",
            "unified_event_id": "f3bbf3a9-eeae-4a5e-a8fc-b53d38d4ee4d",
            "incident_type": "earthquake",
            "severity": "low",
            "source": "EMSC",
            "external_id": "1952059",
            "magnitude": 3.8,
            "latitude": 18.114,
            "longitude": 96.588,
            "happened_at": "2026-02-27T11:50:52+06:30",
            "is_forecast": false,
            "extra_data": {},
            "created_at": "2026-02-27T12:46:25.619991+06:30"
        }
    ],
    "unified_event_id": "f3bbf3a9-eeae-4a5e-a8fc-b53d38d4ee4d"
}

        */
       response_list = response_list.map(item => (
        {"id": item.unified_event_id,
            "type": item.incident_type,
            "severity": item.severity,
            "severityValue": item.magnitude ? `${item.magnitude} magnitude` : "Unknown",
            "happened_at": new Date(item.happened_at).toDateString(),
            "location": `${item.latitude}, ${item.longitude}`,
            "latitude": item.latitude,
            "longitude": item.longitude}));

        console.log("response_list_id", response_list_id);
        console.log("response_list", response_list);
        return response_list;

    }catch(error){
        console.error("Error fetching disaster data:", error);
    }



    return null;

}
