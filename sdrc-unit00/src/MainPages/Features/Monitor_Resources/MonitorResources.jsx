import { useEffect, useReducer, useRef, useState } from "react";
import AnimateInView from "../../../Animations/AnimateInView";
import ResourceCard from "../../Cards/ResourceCard/ResourceCard";
import SearchBar from "../SearchBar/SearchBar";
import "./MonitorResources.css";
import BasicMap from "../../../Map/BasicMap";
import { ArrowLeft } from "lucide-react";

/*
Layout summary : 

    - resource-flex-layout : flex-layout 2 row 2 column 
    - resource-map-layout : scorllable div at left side and map at right side
    - resource-edit-layout : a div at left side and map at right side

*/

export default function MonitorResources() {

    const filter_options = ["Default", "Shelter", "Hospital", "Supplies"];
    const modeList = ["default layout", "map layout", "edit layout"];
    const [mode, setMode] = useState(modeList[0]);
    const [cards, setCards] = useState(null);
    const leftSideBar = useRef({});




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

    useEffect(() => {
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
        setCards(test(2));

    }, [mode]);
    function closeBtnHandler() {
        const l = leftSideBar.current["left_side_bar"];
        const closeIcon = leftSideBar.current["close-btn"];
        const closeBtn = leftSideBar.current["close-icon"];

        if (!l || !closeBtn || !closeIcon) return;

        // Check if the sidebar is already fully closed
        const isOpened = l.style.maxWidth === "0px";

        // If it is closed, open it. If it is open (or empty on first click), close it.
        closeBtn.style.rotate = isOpened ? "0deg" : "180deg";
        l.style.maxWidth = isOpened ? "600px" : "0px";
        l.style.padding = isOpened ? "5px" : "0px";
        l.style.boxShadow = isOpened ? "0px 0px 5px var(--card-shadow)" : "none";
        L.style.opacity = isOpened ? "1" : "0";
    }
    return (
        <div className="monitor-resource-container">
            <h1>Monitor Resources</h1>
            <div className="line"></div>
            <SearchBar filter_options={filter_options} />
            <button className="add-button layout-button" onClick={() => setMode(modeList[0])}>Default Layout</button>
            <button className="add-button layout-button" onClick={() => setMode(modeList[1])}>Map Layout</button>
            <button className="add-button">Add a resource</button>


            {/* normal layout without map only cards*/}
            {mode === modeList[0] && cards ?
                <div className="resouces-flex-layout">

                    {cards.length > 0 ?
                        cards.map((r, i) => (
                            <AnimateInView key={i} delay={(i % 2) * 0.15}>
                                <ResourceCard
                                    name={r.name}
                                    info={r.info}
                                    status={r.status}
                                    location={r.location}
                                    type={r.type}
                                />
                            </AnimateInView>

                        )) :

                        <p style={{ color: "gray", marginTop: "60px", fontSize: "15px" }}>You currently have no data for resources</p>
                    }
                </div> : null
            }
            {/*map layout (Old school)*/}
            {mode === modeList[1] && cards ?
                <AnimateInView>
                    <div className="resource-map-layout">

                        <div className="resource-map-left" ref={el => { if (el) leftSideBar.current["left_side_bar"] = el }}>
                            <h2>Disaster Events </h2>
                            <button className="close-side-bar-btn" ref={el => { if (el) leftSideBar.current["close-btn"] = el }} onClick={() => { closeBtnHandler(); }}>
                                <ArrowLeft className="close-side-bar-icon" ref={el => { if (el) leftSideBar.current["close-icon"] = el }} />
                            </button>

                            <div className="resource-scroll-list">
                                {cards.map((r, i) =>
                                    <ResourceCard
                                        key={"card-1-" + i}
                                        name={r.name}
                                        info={r.info}
                                        status={r.status}
                                        location={r.location}
                                        type={r.type}
                                    />
                                )}
                            </div>
                        </div>
                        <BasicMap />

                    </div>
                </AnimateInView>
                :
                null
            }
        </div>
    )
}