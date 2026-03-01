import { useEffect, useState } from "react";
import SearchBar from "../../Features/SearchBar/SearchBar";
import "./AdminApprovalPage.css";
import ResponderRequestCard from "../../Cards/ResponderRequestCard/ResponderRequestCard";
import AnimateInView from "../../../Animations/AnimateInView";
import { Loader } from "lucide-react";
import { getAllResponders } from "../../../Util/fetchResponders";
import { approveResponder } from "../../../Util/fetchResponders";
import axios from "axios";
import { getRegions } from "../../../Util/fetchPostalCode";
import { timeAgo } from "../../../Util/timeUnitConverter";
export default function AdminApprovalPage() {
    const filter_options = ["Default", "Approved", "Pending"];
    const [loading, setLoading] = useState("getting responders");
    const [error, setError] = useState(null);
    const [responders, setResponders] = useState(null);
    const [filterMode, setFilterMode] = useState(null);

    const approveBtnHandler = (responder_id) => {
        const ok = approveResponder({ setError, setLoading, responder_id });
        if (ok) {
            setResponders(previous_responders => previous_responders.map((r, i) => {
                if (r.id === responder_id) {
                    const updatedResponder = {
                        ...r, status: "Approved"
                    };
                    return updatedResponder;
                }
                return r;
            }));
        }
    }
    const filter_handler = async (option) => {
        const o = option.toLowerCase();
        if (o === "default") {
            getAllResponders({ setError, setLoading, setResponders });
        }
        else if (o === "approved" || o === "pending") {
            const res = await axios.get("http://localhost:8080/api/v1/users/responders", {
                headers: { Authorization: `Bearer ${localStorage.getItem("user_token")}` }
            })

            const data = res.data.data.items.map((r, i) => ({
                "id": r.id,
                "name": r.full_name,
                "phone": r.phone_number,
                "region": getRegions().find(region => region.region_id === r.region_id).region,
                "status": r.is_approved ? "Approved" : "Pending",
                "registered_date": r.created_at,
                "time": timeAgo(r.created_at),
            }));
            const filterd_data = data.filter(d => o === d.status.toLowerCase());
            setResponders(filterd_data);
        }
    }

    useEffect(() => {
        getAllResponders({ setError, setLoading, setResponders });
    }, []);


    return (
        <div className="admin-approval-container">
            <h1>Responder Management</h1>
            <div className="line admin-approval-line" ></div>
            <SearchBar filter_options={filter_options}
                dropDownMaxHeight={120}
                secondaryHeight={120}
                filter_handler={filter_handler}
            />
            <div className="admin-aproval-cards-list">
                {
                    responders?.length > 0 && responders.map((r, i) =>

                        <AnimateInView delay={(i % 3) * 0.15} key={`responder-${r.id}-${i}`}>
                            <ResponderRequestCard data_object={r} onApproved={approveBtnHandler} />
                        </AnimateInView>

                    )
                }
            </div>
            {loading === "getting responders" && <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px"
            }}><Loader className="mypage-loader" /></div>}
        </div>
    );
}