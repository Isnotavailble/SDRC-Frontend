export async function fetchResources(page) {
    const resources = [
        {
            type: "hospital",
            name: "My TownShit",
            status: "closed",
            location: "yangon",
            lat: 16.8053,
            lon: 96.1561, // General Yangon coordinates
            info: "This place is so good that everyone respect the it by not giving a shit"
        },
        {
            type: "shelter",
            name: "Ocean Hlaing Thar Yar",
            status: "full",
            location: "Yangon, Haling Thar YarTownship",
            lat: 16.8778,
            lon: 96.0642, // Coordinates roughly around Hlaing Thar Yar
            info: "Ocean Hlaing Thar Yar provides shelter during disasters, ensuring safety and support for affected communities with compassion and efficiency."
        },
        {
            type: "supplies",
            name: "Junction Square",
            status: "available",
            location: "Yangon, Haling Thar YarTownship",
            lat: 16.8180,
            lon: 96.1311, // Actual coordinates for Junction Square (Kamayut Township)
            info: "Ocean Hlaing Thar Yar provides shelter during disasters, ensuring safety and support for affected communities with compassion and efficiency."
        },
        {
            type: "supplies",
            name: "Junction Square",
            status: "unavailable",
            location: "Yangon, Haling Thar YarTownship",
            lat: 16.8980,
            lon: 96.1311, // Actual coordinates for Junction Square
            info: "Ocean Hlaing Thar Yar provides shelter during disasters, ensuring safety and support for affected communities with compassion and efficiency."
        }
    ];
    const test = (range) => {
        const response = [];
        for (let i = 0; i < range; i++) {
            for (let r in resources) {
                response.push(resources[r]);
                console.log(r);
            }
        }
        return response;
    }
    await new Promise(r => setTimeout(r, 2000));
    return test(page);
}