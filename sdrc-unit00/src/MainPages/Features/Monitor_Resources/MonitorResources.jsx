import ResourceCard from "../../Cards/ResourceCard/ResourceCard";
import ButtonStyle from "../SearchBar/ButtonStyle";
import SearchBar from "../SearchBar/SearchBar";
import "./MonitorResources.css";

export default function MonitorResources() {

    const filter_options = ["Default", "Shelter", "Hospital", "Supplies"];
    const resources = [{
        type: "hospital",
        name: "My TownShit",
        status: "closed",
        location: "yangon",
        info: "This place is so good that everyone respect the it by not giving a shit"
    },
    {
        type: "shelter",
        name: "Ocean Hlaing Thar Yar",
        status: "Full",
        location: "Yangon, Haling Thar YarTownship",
        info: "Ocean Hlaing Thar Yar provides shelter during disasters, ensuring safety and support for affected communities with compassion and efficiency."
    }, {
        type: "supplies",
        name: "Junction Square",
        status: "Available",
        location: "Yangon, Haling Thar YarTownship",
        info: "Ocean Hlaing Thar Yar provides shelter during disasters, ensuring safety and support for affected communities with compassion and efficiency."
    },
    {
        type: "supplies",
        name: "Junction Square",
        status: "Unavailable",
        location: "Yangon, Haling Thar YarTownship",
        info: "Ocean Hlaing Thar Yar provides shelter during disasters, ensuring safety and support for affected communities with compassion and efficiency."
    }];
    const test = (range) => {
        const response = []
        for (let i = 0; i < range; i++) {
            for (let r in resources) {
                response.push(resources[r]);
                console.log(r);
            }
        }
        return response;
    }

    return (
        <div className="monitor-resource-container">
            <h1>Monitor Resources</h1>
            <div className="line"></div>
            <SearchBar filter_options={filter_options} />
            <button className="add-button">Add a resource</button>

            {/* results div*/}
            <div className="resouces-layout">
                {test(2).map((r, i) => <ResourceCard key={i} name={r.name} info={r.info} status={r.status} location={r.location} type={r.type} />)}
            </div>
        </div>
    )
}