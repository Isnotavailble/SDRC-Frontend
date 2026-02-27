import { useEffect, useRef, useState } from "react";
import "./MonitorDisaster.css";
import { fetchAllDisaster } from "../../../Util/fetchDisaster";
import DisasterCard from "../../Cards/DisasterCard/DisasterCard";
import SearchBar from "../SearchBar/SearchBar";
import MapLayoutStyleWrapper from "../Monitor_Resources/MapLayoutStyleWrapper";
import { closeBtnHandler } from "../Monitor_Resources/MonitorResources";
import { ArrowLeft } from "lucide-react";
import BasicMap from "../../../Map/BasicMap";
import AnimateInView from "../../../Animations/AnimateInView";
import axios from "axios";

export default function MonitorDisasters() {

    const filter_options = ["Default", "Low", "Medium", "High"];
    const secondary_options = ["serverity", "location"]
    const [disasters, setDisasters] = useState(null);
    const leftSideBar = useRef({});
    const [selectedEvent, setSelectedEvent] = useState(null);
    //page count for infinit scroll

    useEffect(() => {
        const fetch_process = async () => {
            const response = await fetchAllDisaster();
            setDisasters(response);
            setSelectedEvent(response[0]);
        }
        fetch_process();
        const d = async () => {
            const res = await axios.get("http://localhost:8080/api/v1/incidents/filter?start_date=2026-02-01&end_date=2026-02-18&page=1&page_size=5"

                , { headers: { Authorization: `Bear ${localStorage.getItem("user_token")}` } }
            )
            console.log("incident :", res.data);
        }
        d();
    }, []);

    useEffect(() => {
        if (disasters)
            setSelectedEvent(disasters[0]);
    }, [disasters])

    const filterBtn_handler = async (option) => {
        const o = option.toLowerCase();
        if (o === "default") {
            const data = await fetchAllDisaster();
            setDisasters(data);
        }
        else if (o === "low" || o === 'medium' || o === "high") {
            const data = await fetchAllDisaster();
            const filter_data = data.filter(d => d.severity.toLowerCase() === o);
            setDisasters(filter_data);
            console.log("filter", filter_data);
        }
    }
    const viewHandler = (data) => {
        console.log("clicked", data);
        setSelectedEvent(data);
    }

    return (
        <div className="monitor-disaster-container">
            <h1>Monitor Disaster Events</h1>
            <div className="line"></div>
            <SearchBar
                filter_options={filter_options}
                dropDownMaxHeight={120}
                secondaryHeight={90}
                filter_handler={filterBtn_handler}
                secondary_filter_options={secondary_options}
            />

            {/*importing css of resource-map-layout design*/}
            <MapLayoutStyleWrapper>
                {disasters?.length > 0 &&
                    <AnimateInView>
                        {/* This is the flex box layout from monitor resource component */}
                        <div className="resource-map-layout disaster-map-layout">

                            {/* The left side bar*/}
                            <div className="resource-map-left disaster-map-left" ref={el => { if (el) leftSideBar.current["left_side_bar"] = el }}>

                                <button className="close-side-bar-btn" ref={el => { if (el) leftSideBar.current["close-btn"] = el }} onClick={() => { closeBtnHandler(leftSideBar); }}>
                                    <ArrowLeft className="close-side-bar-icon" ref={el => { if (el) leftSideBar.current["close-icon"] = el }} />
                                </button>

                                <div ref={el => { if (el) leftSideBar.current["hiding_place"] = el }} style={{ transition: "ease all 0.5s" }}>

                                    <h2>Disaster Events</h2>
                                    <div className="resource-scroll-list disaster-scroll-list">
                                        { /* Scroll list of disaster cards*/
                                            disasters?.length > 0 && disasters.map((d, i) =>
                                                <DisasterCard key={`disaster-${d.type}-${i}`} data_object={d} viewHandler={viewHandler} />)}
                                    </div>
                                </div>
                            </div>

                            {/*Map component*/
                                selectedEvent && <BasicMap
                                    centerPoint={
                                        selectedEvent.latitude && selectedEvent.longitude ?
                                            [selectedEvent.latitude, selectedEvent.longitude] : null
                                    }
                                    points={disasters}
                                    onMapClick={() => { }}
                                    isEditing={false} />
                            }
                        </div>
                    </AnimateInView>
                }
                {disasters?.length < 1 && <p style={{ color: "gray", position: "absolute", left: "150px", top: "220px" }}> No Data Available</p>}
            </MapLayoutStyleWrapper>

        </div>
    )
}