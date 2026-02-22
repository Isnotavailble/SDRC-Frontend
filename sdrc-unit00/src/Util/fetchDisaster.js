export async function fetchAllDisaster() {
    const disaster = [
        {
            "id": 1,
            "type": "Earthquake",
            "severity": "high",
            "severityValue": "7.2 magnitude",
            "time": "2023-11-12 14:30",
            "location": "near Taungoo, Bago Region",
            "lat": 18.9433,
            "lon": 96.4326
        },
        {
            "id": 2,
            "type": "Storm",
            "severity": "medium",
            "severityValue": "65 mph wind gusts",
            "time": "2023-11-13 08:15",
            "location": "near Pathein, Ayeyarwady",
            "lat": 16.7794,
            "lon": 94.7319
        },
        {
            "id": 3,
            "type": "Flood",
            "severity": "low",
            "severityValue": "2.1 feet water level",
            "time": "2023-11-14 09:00",
            "location": "near Hlaing Township, Yangon",
            "lat": 16.8409,
            "lon": 96.1265
        },
        {
            "id": 4,
            "type": "Earthquake",
            "severity": "low",
            "severityValue": "3.1 magnitude",
            "time": "2023-11-14 22:10",
            "location": "near Mandalay City",
            "lat": 21.9588,
            "lon": 96.0891
        },
        {
            "id": 5,
            "type": "Flood",
            "severity": "high",
            "severityValue": "8.5 feet water level",
            "time": "2023-11-15 06:45",
            "location": "near Bago City",
            "lat": 17.3333,
            "lon": 96.4833
        }
    ];
    await new Promise(r => setTimeout(r, 2000));
    return disaster;

}