import ButtonStyle from "../SearchBar/ButtonStyle";
import SearchBar from "../SearchBar/SearchBar";
import "./MonitorResources.css";

export default function MonitorResources() {

    const filter_options = ["Shelter", "Hospital", "Supplies"];
    return (
        <div className="monitor-resource-container">
            <h1>Monitor Resources</h1>
            <div className="line"></div>
            <SearchBar filter_options={filter_options} />
            <button className="add-button">Add a resource</button>

            {/* results div*/}
            <div>

            </div>
        </div>
    )
}