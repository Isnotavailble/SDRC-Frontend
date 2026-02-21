import { useEffect, useReducer, useRef, useState } from "react";
import AnimateInView from "../../../Animations/AnimateInView";
import ResourceCard from "../../Cards/ResourceCard/ResourceCard";
import SearchBar from "../SearchBar/SearchBar";
import "./MonitorResources.css";
import BasicMap from "../../../Map/BasicMap";
import { ArrowLeft } from "lucide-react";
import ResourceEditCard from "../../Cards/ResourceEditCard/ResourceEditCard";
import ResourceCardWrapper from "../Wrappers/ResourceCardWrapper";
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
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [editingCardId, setEditingCardId] = useState(null);
    const [scrollTarget, setScrollTarget] = useState(null);//key id of card-1-i
    const leftSideBar = useRef({});

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
            status: "Full",
            location: "Yangon, Haling Thar YarTownship",
            lat: 16.8778,
            lon: 96.0642, // Coordinates roughly around Hlaing Thar Yar
            info: "Ocean Hlaing Thar Yar provides shelter during disasters, ensuring safety and support for affected communities with compassion and efficiency."
        },
        {
            type: "supplies",
            name: "Junction Square",
            status: "Available",
            location: "Yangon, Haling Thar YarTownship",
            lat: 16.8180,
            lon: 96.1311, // Actual coordinates for Junction Square (Kamayut Township)
            info: "Ocean Hlaing Thar Yar provides shelter during disasters, ensuring safety and support for affected communities with compassion and efficiency."
        },
        {
            type: "supplies",
            name: "Junction Square",
            status: "Unavailable",
            location: "Yangon, Haling Thar YarTownship",
            lat: 16.8980,
            lon: 96.1311, // Actual coordinates for Junction Square
            info: "Ocean Hlaing Thar Yar provides shelter during disasters, ensuring safety and support for affected communities with compassion and efficiency."
        }
    ];
    useEffect(() => {
        if (cards?.length > 0) return;
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
        setCards(test(5));
        setSelectedPoint(resources[0]);
    }, []);

    useEffect(() => {
        //scroll logic        
        if (mode === modeList[1] && scrollTarget) {
            //simply get the Id of wrapper component 
            const targetDOM = document.getElementById(scrollTarget);
            if (targetDOM) {
                //wait 200ms for DOM loading and add that DOM scroll logic
                setTimeout(() => { targetDOM.scrollIntoView({ behavior: "smooth", block: "center" }); }, 200);
                //clear the scroll target state
                setScrollTarget(null);
            }

        }

    }, [mode, scrollTarget]);

    //behaviour during swtiching layout
    useEffect(() => {
        if (mode === modeList[0]) {
            setEditingCardId(null);
        }
    }, [mode]);
    //helper fucntion for close btn
    //the Flow make 0px to maxWidth, remove box shadow and padding (inner width)
    const closeBtnHandler = () => {
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

    // Create a function to handle the click from the map
    const handleMapClick = (latlng) => {
        console.log("User clicked the map at:", latlng.lat, latlng.lng);

        // Example: If a card is currently being edited, you can save these 
        // coordinates to a state to pass to your <ResourceEditCard>!
    };
    const handleCancel = () => {
        setEditingCardId(null);
    }

    //this will auto scroll when swtiching from the normal view to map view 
    //the side bar will be auto scroll until the div appear
    const handleView = (data, id) => {

        //auto scroll is enable when user is from default layout
        if (mode !== modeList[1]) {
            setMode(modeList[1]);
            setScrollTarget(id);
        }

        setSelectedPoint(data);

        console.log("scrolltarget" + id);
    }
    //check in wrapper
    const handleUpdate = (id) => {
        if (mode !== modeList[1]) {
            setMode(modeList[1]);
            setScrollTarget(id);
        }
        setEditingCardId(id);
    }
    return (
        <div className="monitor-resource-container">
            <h1>Monitor Resources</h1>
            <div className="line"></div>
            <SearchBar filter_options={filter_options} />
            <button className={`add-button layout-button ${mode === modeList[0] && "clicked-mode-button"}`} onClick={() => setMode(modeList[0])}>Default Layout</button>
            <button className={`add-button layout-button ${mode === modeList[1] && "clicked-mode-button"}`} onClick={() => setMode(modeList[1])}>Map Layout</button>
            <button className="add-button">Add a resource</button>


            {/* normal layout without map only cards*/}
            {mode === modeList[0] && cards ?
                <div className="resouces-flex-layout">


                    {cards.length > 0 ?
                        cards.map((r, i) => (
                            <AnimateInView key={"card-1-" + i} delay={(i % 2) * 0.15}>
                                <ResourceCardWrapper
                                    key={`card-1-${i}`}
                                    data_object={r}
                                    onView={handleView}
                                    isEditing={editingCardId === `card-1-${i}`}
                                    onEdit={handleUpdate}
                                    card_id={`card-1-${i}`} />
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

                                    <ResourceCardWrapper
                                        data_object={r}

                                        onCancel={handleCancel}
                                        key={`card-1-${i}`}
                                        onView={handleView}
                                        isEditing={editingCardId === `card-1-${i}`}
                                        onEdit={handleUpdate}
                                        card_id={`card-1-${i}`} />
                                )}
                            </div>
                        </div>
                        {selectedPoint &&
                            <BasicMap centerPoint={[selectedPoint.lat, selectedPoint.lon]} points={resources} onMapClick={handleMapClick} isEditing={editingCardId !== null} />}

                    </div>
                </AnimateInView>
                :
                null
            }
        </div>
    )
}