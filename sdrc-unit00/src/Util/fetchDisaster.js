import axios from "axios";
import { getRecentDateRange } from "./timeUnitConverter";

/*
response format 
{
                "unified_event_id": "86fb4e79-c089-4ea9-9006-fb7f41ac0e75",
                "happened_at": "2026-02-22T06:18:46+06:30",
                "avg_magnitude": 3.5,
                "severity": "low",
                "incident_type": "earthquake",
                "latitude": 25.97,
                "longitude": 96.17,
                "region": ""
            }



*/

export async function fetchAllDisaster(start_date, end_date) {

    try {
        const { startDate, endDate } = getRecentDateRange(60)
        //final checking 
        start_date = start_date || startDate;
        end_date = end_date || endDate;

        const PAGE_MAX_SIZE = 10;
        let current_page = 1;
        let response_list = [];
        console.log("start date : ", start_date);
        console.log("end date : ", end_date);

        while (true) {
            const res = await axios.get(`http://localhost:8080/api/v1/incidents/filter?start_date=${start_date}&end_date=${end_date}&page=${current_page}&page_size=${PAGE_MAX_SIZE}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("user_token")}`
                    }
                });

            if (res.data.data.items.length < 1)
                break;
            current_page += 1;

            res.data.data.items.forEach(incident => response_list.push(incident));
            console.log("incidents", response_list);
        }



        /*const page_count = 10;
        const response_list_id = [];
        let response_list = [];
        for (let page = 1; page < 10; page++) {
            const res = await axios.get(`http://localhost:8080/api/v1/incidents?page=${page}&page_size=5`, { headers: { Authorization: `Bearer ${localStorage.getItem("user_token")}` } });
            console.log("res", res);
            if (res.data.data?.items?.length === 0)
                break;
            res.data.data.items.forEach((item) => { response_list_id.push(item.unified_event_id) });
        }

        for (let id in response_list_id) {
            const res = await axios.get(`http://localhost:8080/api/v1/incidents/${response_list_id[id]}`, { headers: { Authorization: `Bearer ${localStorage.getItem("user_token")}` } });
            console.log("res detail", res.data.data.raw_reports);
            response_list.push(res.data.data.raw_reports[0]);
        }
            */
        response_list = response_list.map(item => (
            {
                "id": item.unified_event_id,
                "type": item.incident_type,
                "severity": item.severity,
                "severityValue": item.avg_magnitude ? `${item.avg_magnitude} magnitude` : "Unknown",
                "happened_at": new Date(item.happened_at).toDateString(),
                "location": `${item.latitude}, ${item.longitude}`,
                "latitude": item.latitude,
                "longitude": item.longitude
            }));


        return response_list;

    } catch (error) {
        console.error("Error fetching disaster data:", error);
    }
}
