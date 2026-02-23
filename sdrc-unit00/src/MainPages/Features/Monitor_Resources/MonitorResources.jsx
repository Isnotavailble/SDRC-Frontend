import { useEffect, useReducer, useRef, useState } from "react";
import AnimateInView from "../../../Animations/AnimateInView";
import ResourceCard from "../../Cards/ResourceCard/ResourceCard";
import SearchBar from "../SearchBar/SearchBar";
import "./MonitorResources.css";
import BasicMap from "../../../Map/BasicMap";
import { ArrowLeft } from "lucide-react";
import ResourceEditCard from "../../Cards/ResourceEditCard/ResourceEditCard";
import ResourceCardWrapper from "../Wrappers/ResourceCardWrapper";
import { fetchResources } from "../../../Util/fetchReources";
/*
Layout summary : 

    - resource-flex-layout : flex-layout 2 row 2 column 
    - resource-map-layout : scorllable div at left side and map at right side
    - resource-edit-layout : a div at left side and map at right side

----------------------------------------------------------------------
expected format for Cards state : 
        {
            type: "hospital",
            name: "My TownShit",
            status: "closed",
            location: "yangon",
            lat: 16.8053,
            lon: 96.1561, // General Yangon coordinates
            info: "This place is so good that everyone respect the it by not giving a shit"
        }
*/

//helper fucntion for close btn
//the Flow make 0px to maxWidth, remove box shadow and padding (inner width)
//updated : export this helper function to reused in disaster event feature
export const closeBtnHandler = (leftSideBar) => {
    const l = leftSideBar.current["left_side_bar"];
    const closeIcon = leftSideBar.current["close-btn"];
    const closeBtn = leftSideBar.current["close-icon"];
    const hiding_place = leftSideBar.current["hiding_place"];

    if (!l || !closeBtn || !closeIcon || !hiding_place) return;

    // Check if the sidebar is already fully closed
    const isOpened = l.style.maxWidth === "0px";

    // If it is closed, open it. If it is open (or empty on first click), close it.
    closeBtn.style.rotate = isOpened ? "0deg" : "180deg";
    l.style.maxWidth = isOpened ? "600px" : "0px";
    l.style.padding = isOpened ? "5px" : "0px";
    l.style.boxShadow = isOpened ? "0px 0px 5px var(--card-shadow)" : "none";
    //l.style.opacity = isOpened ? "1" : "0";
    hiding_place.style.opacity = isOpened ? "1" : "0";
}

export default function MonitorResources() {

    const filter_options = ["Default", "Shelter", "Hospital", "Supplies"];
    const secondary_filter_options = ["name", "location", "status"];
    const modeList = ["default layout", "map layout", "add resource"];
    const [mode, setMode] = useState(modeList[0]);

    //api state
    const [cards, setCards] = useState(null);

    //this state never back to null because this act like a fallback state for map
    //for view button from resource card
    const [selectedPoint, setSelectedPoint] = useState(null);//the json object from cards list

    //special id : add-card ( for add button)
    const [editingCardId, setEditingCardId] = useState(null);//key id of card-1-i
    const [scrollTarget, setScrollTarget] = useState(null);//key id of card-1-i
    const leftSideBar = useRef({});

    useEffect(() => {

        if (cards?.length > 0) return;
        //simulated fetching ...
        const fetchingData = async () => {
            const r = await fetchResources(5);
            setSelectedPoint(r[0]);
            setCards(r);
        }
        fetchingData();
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


    // Create a function to handle the click from the map
    const handleMapClick = (latlng) => {
        console.log("User clicked the map at:", latlng.lat, latlng.lng);
        setSelectedPoint(previousPoint => (
            {
                ...previousPoint,
                lat: Math.round(latlng.lat * 100000) / 100000,
                lon: Math.round(latlng.lng * 100000) / 100000
            }));
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
    const handleUpdate = (data, id) => {


        if (mode !== modeList[1]) {
            setMode(modeList[1]);
            setScrollTarget(id);
        }
        setEditingCardId(id);
        setSelectedPoint(data);

    }
    //add a resource handler
    const handleAddResource = () => {
        if (mode === modeList[0])
            setMode(modeList[1]);
        setEditingCardId("add-card");
    }
    return (
        <div className="monitor-resource-container">
            <h1>Monitor Resources</h1>
            <div className="line"></div>
            <SearchBar filter_options={filter_options} dropDownMaxHeight={120} secondaryHeight={121} secondary_filter_options={secondary_filter_options} />
            <button className={`add-button layout-button ${mode === modeList[0] && "clicked-mode-button"}`} onClick={() => setMode(modeList[0])}>Default Layout</button>
            <button className={`add-button layout-button ${mode === modeList[1] && "clicked-mode-button"}`} onClick={() => setMode(modeList[1])}>Map Layout</button>
            <button className={`add-button ${mode === modeList[1] && editingCardId === "add-card" && "clicked-mode-button"}`} onClick={() => handleAddResource()}>Add a resource</button>


            {/* normal layout without map only cards*/}
            {mode === modeList[0] && cards ?
                <div className="resouces-flex-layout">
                    {/*data list*/
                        cards.length > 0 ?
                            cards.map((r, i) => (
                                <AnimateInView key={"card-1-" + i} delay={(i % 3) * 0.15}>
                                    <ResourceCardWrapper
                                        key={`card-1-${i}`}
                                        data_object={r}
                                        onView={handleView}
                                        isEditing={editingCardId === `card-1-${i}`}
                                        selectedGeoPoint={selectedPoint}
                                        onEdit={handleUpdate}
                                        card_id={`card-1-${i}`} />
                                </AnimateInView>

                            )) :

                            <p style={{ color: "gray", marginTop: "60px", fontSize: "15px" }}>You currently have no data for resources</p>
                    }
                </div> : null
            }
            {/*map layout (Old school)*/}
            {mode === modeList[1] && cards?.length > 0 ?
                <AnimateInView>
                    <div className="resource-map-layout">

                        <div className="resource-map-left" ref={el => { if (el) leftSideBar.current["left_side_bar"] = el }}>
                            <button className="close-side-bar-btn" ref={el => { if (el) leftSideBar.current["close-btn"] = el }} onClick={() => { closeBtnHandler(leftSideBar); }}>
                                <ArrowLeft className="close-side-bar-icon" ref={el => { if (el) leftSideBar.current["close-icon"] = el }} />
                            </button>
                            <div ref={el => { if (el) leftSideBar.current["hiding_place"] = el }} style={{ transition: "ease all 0.5s" }}>
                                <h2>Resource Areas</h2>
                                <div className="resource-scroll-list">
                                    {/*add a resource card this will only appear if user click ADD button */
                                        editingCardId === "add-card" &&
                                        <ResourceEditCard onCancle={handleCancel} openAddOption={true} selectedGeoPoint={selectedPoint} />
                                    }
                                    {cards.map((r, i) =>

                                        <ResourceCardWrapper
                                            data_object={r}
                                            onCancel={handleCancel}
                                            key={`card-1-${i}`}
                                            selectedGeoPoint={selectedPoint}
                                            onView={handleView}
                                            isEditing={editingCardId === `card-1-${i}`}
                                            onEdit={handleUpdate}
                                            card_id={`card-1-${i}`} />
                                    )}
                                </div>
                            </div>

                        </div>
                        { // This component is safe even hander is passed down . Import prop isEditing if it is true the handler is executed
                            selectedPoint &&
                            <BasicMap centerPoint={[selectedPoint.lat, selectedPoint.lon]} points={cards} onMapClick={handleMapClick} isEditing={editingCardId !== null} />}

                    </div>
                </AnimateInView>
                :
                null
            }
        </div>
    )
}