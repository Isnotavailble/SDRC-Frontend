import { useEffect, useRef, useState } from "react";
import DisasterOverviewCard from "../../Cards/DisasterOverviewCard/DisasterOverviewCard";
import ResourceOverviewCard from "../../Cards/ResourceOverviewCard/ResourceOverviewCard";
import UserOverviewCard from "../../Cards/UserOverview/UserOverview";
import "./AdminOverviewPage.css";
import DisasterCard from "../../Cards/DisasterCard/DisasterCard";
import BasicMap from "../../../Map/BasicMap";
import AnimateInView from "../../../Animations/AnimateInView";
import MapLayoutStyleWrapper from "../../Features/Monitor_Resources/MapLayoutStyleWrapper";
import { closeBtnHandler } from "../../Features/Monitor_Resources/MonitorResources";
import { fetchAllDisaster } from "../../../Util/fetchDisaster";
import { ArrowLeft } from "lucide-react";


//the copied pasted code from feature compno
export default function AdminOverviewPage() {
    const leftSideBar = useRef({});
    const [disasters, setDisasters] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    //page count for infinit scroll

    useEffect(() => {
        const fetch_process = async () => {
            const response = await fetchAllDisaster();
            setDisasters(response);
            setSelectedEvent(response[0]);
        }
        fetch_process();
    }, []);

    const viewHandler = (data) => {
        console.log("clicked", data);
        setSelectedEvent(data);
    }

    return (
        <div className="overview-page-container">
            <h1>Admin Overview Page</h1>
            <div className="line"></div>
            <div className="overview-row">
                <UserOverviewCard status="pending" users_count={10} />
                <UserOverviewCard status="approved" users_count={12} />
                <ResourceOverviewCard resource_count={10} />
                <DisasterOverviewCard disaster_count={23} />
            </div>

            <MapLayoutStyleWrapper>
                {disasters?.length > 0 &&
                    <AnimateInView>
                        {/* This is the flex box layout from monitor resource component */}
                        <div className="resource-map-layout disaster-map-layout">

                            {/* The left side bar*/}
                            <div className="resource-map-left disaster-map-left"  ref={el => { if (el) leftSideBar.current["left_side_bar"] = el }}>

                                <button className="close-side-bar-btn" style={{marginLeft : "100px"}} ref={el => { if (el) leftSideBar.current["close-btn"] = el }} onClick={() => { closeBtnHandler(leftSideBar); }}>
                                    <ArrowLeft className="close-side-bar-icon" ref={el => { if (el) leftSideBar.current["close-icon"] = el }} />
                                </button>

                                <div ref={el => { if (el) leftSideBar.current["hiding_place"] = el }} style={{ transition: "ease all 0.5s" }}>

                                    <h2>Recent Eevents</h2>
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
            </MapLayoutStyleWrapper>
        </div>
    );
}