import { useEffect, useState } from "react";
import SearchBar from "../../Features/SearchBar/SearchBar";
import "./AdminApprovalPage.css";
import ResponderRequestCard from "../../Cards/ResponderRequestCard/ResponderRequestCard";
import AnimateInView from "../../../Animations/AnimateInView";
import { Loader } from "lucide-react";
import { fetchAllDisaster } from "../../../Util/fetchDisaster";
import { getAllResponders } from "../../../Util/fetchResponders";
import { approveResponder } from "../../../Util/fetchApproveResponder";
export default function AdminApprovalPage() {
    const filter_options = ["Default", "Approved", "Pending"];
    const [loading, setLoading] = useState("getting responders");
    const [error, setError] = useState(null);
    const [responders, setResponders] = useState(null);
    const [filterMode, setFilterMode] = useState(null);

    const approveBtnHandler = (responder_id) => {
        const ok = approveResponder({ setError, setLoading, responder_id });
        return ok? "approved" : "pending";
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