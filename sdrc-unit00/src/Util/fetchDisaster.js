import axios from "axios";

export async function fetchAllDisaster() {

    const disaster = [
        {
            "id": 1,
            "type": "Earthquake",
            "severity": "high",
            "severityValue": "7.2 magnitude",
            "happened_at": "2023-11-12 14:30",
            "location": "near Taungoo, Bago Region",
            "latitude": 18.9433,
            "longitude": 96.4326
        },
        {
            "id": 4,
            "type": "Earthquake",
            "severity": "low",
            "severityValue": "3.1 magnitude",
            "happened_at": "2023-11-14 22:10",
            "location": "near Mandalay City",
            "latitude": 21.9588,
            "longitude": 96.0891
        },
        {
            "id": 5,
            "type": "Earthquake",
            "severity": "high",
            "severityValue": "4.2 magnitude",
            "happened_at": "2023-11-15 06:45",
            "location": "near Bago City",
            "latitude": 17.3333,
            "longitude": 96.4833
        }
    ];

    await new Promise(r => setTimeout(r, 2000));
    return disaster;

}