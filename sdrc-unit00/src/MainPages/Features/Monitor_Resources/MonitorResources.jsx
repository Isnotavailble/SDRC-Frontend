import { useEffect, useReducer, useRef, useState } from "react";
import AnimateInView from "../../../Animations/AnimateInView";
import ResourceCard from "../../Cards/ResourceCard/ResourceCard";
import SearchBar from "../SearchBar/SearchBar";
import "./MonitorResources.css";
import BasicMap from "../../../Map/BasicMap";
import { ArrowLeft } from "lucide-react";
import ResourceEditCard from "../../Cards/ResourceEditCard/ResourceEditCard";
import ResourceCardWrapper from "../Wrappers/ResourceCardWrapper";
import { addResource, deleteResource, fetchAllResources, updateResource } from "../../../Util/fetchReources";
import axios from "axios";
/*
Layout summary : 

    - resource-flex-layout : flex-layout 2 row 2 column 
    - resource-map-layout : scorllable div at left side and map at right side
    - resource-edit-layout : a div at left side and map at right side

----------------------------------------------------------------------
expected format for Cards state : 

{
  "resource_name": "Community Shelter B",
  "resource_type": "shelter",
  "contact_info": "+959100000002",
  "status": "Available",
  "region": "နေပြည်တော် (ပြည်ထောင်စုနယ်မြေ)",
  "latitude": 16.8835,
  "created_at : 


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
    const [resources, setResources] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    //api state
    const [cards, setCards] = useState(null);
    useEffect(() => { console.log(resources) }, [resources])
    //this state never back to null because this act like a fallback state for map
    //for view button from resource card
    const [selectedPoint, setSelectedPoint] = useState(null);//the json object from cards list

    //special id : add-card ( for add button)
    const [editingCardId, setEditingCardId] = useState(null);//key id of card-1-i
    const [scrollTarget, setScrollTarget] = useState(null);//key id of card-1-i
    const leftSideBar = useRef({});

    useEffect(() => {
        fetchAllResources({ setLoading, setError, setResources });
    }, []);
    const filterBtnHandler = async (option) => {
        const token = localStorage.getItem("user_token");
        if (option.toLowerCase() === "default") {
            fetchAllResources({ setLoading, setResources, setrror : setError });
        }
        else if (option.toLowerCase() === "shelter" || option.toLowerCase() === "supplies" || option.toLowerCase() === "hospital") {
            const res = await axios.get("http://localhost:8080/api/v1/resources",
                {
                    headers:
                        { Authorization: `Bearer ${token}` }
                }
            );
            console.log("filtered : ", option.toLowerCase());
            const filtered_data = res.data.data.filter(item => item.resource_type === option.toLowerCase());
            setResources(filtered_data);
        }
    }

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
                latitude: Math.round(latlng.lat * 100000) / 100000,
                longitude: Math.round(latlng.lng * 100000) / 100000
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
    //confirm add reouce btn handler 
    const handleConfirmAdd = (data_object) => {
        addResource({ data: data_object, setResources })
        setEditingCardId(null);

    }
    //confirm update in edit card 
    const handleConfirmUpdate = (data_object) => {
        updateResource({ data: data_object, setError, setLoading, setResources });
        setEditingCardId(null);
    }
    //delete resource btn handler 
    const handleDeleteResource = (data_object) => {
        console.log("data to be deleted", data_object)
        deleteResource({ data: data_object, setResources });
    }
    const role = JSON.parse(localStorage.getItem("user")).role;
    return (
        <div className="monitor-resource-container">
            <h1>Monitor Resources</h1>
            <div className="line"></div>
            <SearchBar
                filter_options={filter_options} dropDownMaxHeight={120}
                secondaryHeight={121}
                needSearch={false}
                secondary_filter_options={secondary_filter_options} filter_handler={filterBtnHandler} />
            {role === "responder" &&
                <>
                    <button className={`add-button layout-button ${mode === modeList[0] && "clicked-mode-button"}`} onClick={() => setMode(modeList[0])}>Default Layout</button>
                    <button className={`add-button layout-button ${mode === modeList[1] && "clicked-mode-button"}`} onClick={() => setMode(modeList[1])}>Map Layout</button>
                    <button className={`add-button ${mode === modeList[1] && editingCardId === "add-card" && "clicked-mode-button"}`} onClick={() => handleAddResource()}>Add a resource</button>

                </>
            }

            {/* normal layout without map only cards*/}
            {
                mode === modeList[0] && resources ?
                    <div className="resouces-flex-layout">
                        {/*data list*/
                            resources.length > 0 ?
                                resources.map((r, i) => (
                                    <AnimateInView key={"card-1-" + i} delay={(i % 3) * 0.15}>
                                        <ResourceCardWrapper
                                            key={`card-1-${i}`}
                                            data_object={r}
                                            onDelete={handleDeleteResource}
                                            onView={handleView}
                                            isEditing={editingCardId === `card-1-${i}`}
                                            selectedGeoPoint={selectedPoint}
                                            onEdit={handleUpdate}
                                            card_id={`card-1-${i}`} />
                                    </AnimateInView>

                                )) :
                                <AnimateInView>
                                    <p style={{ color: "gray", marginTop: "60px", fontSize: "15px" }}>You currently have no data for resources</p>
                                </AnimateInView>


                        }
                    </div> : null
            }
            {/*map layout (Old school)*/}
            {
                mode === modeList[1] ?
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
                                            <ResourceEditCard onCancle={handleCancel} onComfirn={handleConfirmAdd} openAddOption={true} selectedGeoPoint={selectedPoint} />
                                        }
                                        {resources.length > 0 && resources.map((r, i) =>

                                            <ResourceCardWrapper
                                                data_object={r}
                                                onCancel={handleCancel}
                                                onDelete={handleDeleteResource}
                                                onComfirn={handleConfirmUpdate}
                                                key={`card-1-${i}`}
                                                selectedGeoPoint={selectedPoint}
                                                onView={handleView}
                                                isEditing={editingCardId === `card-1-${i}`}
                                                onEdit={handleUpdate}
                                                card_id={`card-1-${i}`} />
                                        )}
                                        {
                                            resources.length < 1 && <p style={{ color: "gray", marginTop: "60px", fontSize: "15px" }}>You currently have no data for resources</p>
                                        }
                                    </div>
                                </div>

                            </div>


                            <BasicMap
                                centerPoint={selectedPoint?.latitude && selectedPoint?.longitude ? [selectedPoint.latitude, selectedPoint.longitude] : null}
                                points={resources}
                                onMapClick={handleMapClick}
                                isEditing={editingCardId !== null}
                            />


                        </div>

                    </AnimateInView>
                    :
                    null
            }
        </div >
    )
}