import axios from "axios";

export async function fetchAllDisaster() {

    const disaster = [
        {
            "id": 1,
            "type": "Earthquake",
            "severity": "high",
            "severityValue": "7.2 magnitude",
            "happened_at": "2023-11-12 14:30",
            "location": "Taungoo, Bago Region",
            "latitude": 18.9433,
            "longitude": 96.4326
        },
        {
            "id": 2,
            "type": "Earthquake",
            "severity": "low",
            "severityValue": "3.1 magnitude",
            "happened_at": "2023-11-14 22:10",
            "location": "Mandalay City",
            "latitude": 21.9588,
            "longitude": 96.0891
        },
        {
            "id": 3,
            "type": "Earthquake",
            "severity": "high",
            "severityValue": "6.2 magnitude",
            "happened_at": "2023-11-15 06:45",
            "location": "Bago City",
            "latitude": 17.3333,
            "longitude": 96.4833
        },
        {
            "id": 4,
            "type": "Earthquake",
            "severity": "medium",
            "severityValue": "5.5 magnitude",
            "happened_at": "2023-10-22 03:15",
            "location": "Sagaing City",
            "latitude": 21.8787,
            "longitude": 95.9760
        },
        {
            "id": 5,
            "type": "Earthquake",
            "severity": "low",
            "severityValue": "3.8 magnitude",
            "happened_at": "2023-12-05 08:30",
            "location": "Naypyidaw",
            "latitude": 19.7450,
            "longitude": 96.1297
        },
        {
            "id": 6,
            "type": "Earthquake",
            "severity": "high",
            "severityValue": "6.8 magnitude",
            "happened_at": "2023-11-20 20:45",
            "location": "Kengtung, Shan State",
            "latitude": 21.2913,
            "longitude": 99.6048
        },
        {
            "id": 7,
            "type": "Earthquake",
            "severity": "low",
            "severityValue": "2.9 magnitude",
            "happened_at": "2023-12-10 01:10",
            "location": "Myitkyina, Kachin State",
            "latitude": 25.3833,
            "longitude": 97.4000
        },
        {
            "id": 8,
            "type": "Earthquake",
            "severity": "medium",
            "severityValue": "4.8 magnitude",
            "happened_at": "2023-09-18 10:15",
            "location": "Pyin Oo Lwin",
            "latitude": 22.0333,
            "longitude": 96.4667
        },
        {
            "id": 9,
            "type": "Earthquake",
            "severity": "low",
            "severityValue": "3.5 magnitude",
            "happened_at": "2023-11-25 23:55",
            "location": "Magway City",
            "latitude": 20.1500,
            "longitude": 94.9167
        },
        {
            "id": 10,
            "type": "Earthquake",
            "severity": "high",
            "severityValue": "6.5 magnitude",
            "happened_at": "2023-08-14 18:20",
            "location": "Thabeikkyin, Mandalay Region",
            "latitude": 22.8833,
            "longitude": 95.9833
        },
        {
            "id": 11,
            "type": "Earthquake",
            "severity": "medium",
            "severityValue": "5.2 magnitude",
            "happened_at": "2023-04-05 13:45",
            "location": "Bagan, Mandalay Region",
            "latitude": 21.1717,
            "longitude": 94.8583
        },
        {
            "id": 12,
            "type": "Earthquake",
            "severity": "low",
            "severityValue": "3.2 magnitude",
            "happened_at": "2023-09-02 15:20",
            "location": "Hakha, Chin State",
            "latitude": 22.6433,
            "longitude": 93.6053
        },
        {
            "id": 13,
            "type": "Earthquake",
            "severity": "medium",
            "severityValue": "4.5 magnitude",
            "happened_at": "2023-07-25 09:10",
            "location": "Hinthada, Ayeyarwady Region",
            "latitude": 17.6475,
            "longitude": 95.4586
        },
        {
            "id": 14,
            "type": "Earthquake",
            "severity": "low",
            "severityValue": "3.7 magnitude",
            "happened_at": "2023-03-12 14:00",
            "location": "Dawei, Tanintharyi Region",
            "latitude": 14.0828,
            "longitude": 98.1940
        },
        {
            "id": 15,
            "type": "Earthquake",
            "severity": "high",
            "severityValue": "6.1 magnitude",
            "happened_at": "2023-06-30 22:45",
            "location": "Shwebo, Sagaing Region",
            "latitude": 22.5667,
            "longitude": 95.7000
        },
        {
            "id": 16,
            "type": "Earthquake",
            "severity": "medium",
            "severityValue": "5.0 magnitude",
            "happened_at": "2023-01-18 11:30",
            "location": "Tachileik, Shan State",
            "latitude": 20.4465,
            "longitude": 99.8773
        },
        {
            "id": 17,
            "type": "Earthquake",
            "severity": "low",
            "severityValue": "3.4 magnitude",
            "happened_at": "2023-05-22 07:15",
            "location": "Taunggyi, Shan State",
            "latitude": 20.7833,
            "longitude": 97.0333
        },
        {
            "id": 18,
            "type": "Earthquake",
            "severity": "medium",
            "severityValue": "4.9 magnitude",
            "happened_at": "2023-10-08 16:50",
            "location": "Bhamo, Kachin State",
            "latitude": 24.2667,
            "longitude": 97.2333
        },
        {
            "id": 19,
            "type": "Earthquake",
            "severity": "low",
            "severityValue": "3.9 magnitude",
            "happened_at": "2023-02-14 04:20",
            "location": "Meiktila, Mandalay Region",
            "latitude": 20.8833,
            "longitude": 95.8667
        },
        {
            "id": 20,
            "type": "Earthquake",
            "severity": "medium",
            "severityValue": "5.4 magnitude",
            "happened_at": "2023-08-28 19:10",
            "location": "Yangon City",
            "latitude": 16.8409,
            "longitude": 96.1735
        }
    ];


    /*await new Promise(r => setTimeout(r, 100));*/
    return disaster;

}