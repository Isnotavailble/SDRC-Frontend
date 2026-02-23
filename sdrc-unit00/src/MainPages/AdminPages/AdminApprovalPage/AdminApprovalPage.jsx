import { useEffect, useState } from "react";
import SearchBar from "../../Features/SearchBar/SearchBar";
import "./AdminApprovalPage.css";
import ResponderRequestCard from "../../Cards/ResponderRequestCard/ResponderRequestCard";
import AnimateInView from "../../../Animations/AnimateInView";
export default function AdminApprovalPage() {
    const filter_options = ["Default", "Approved", "Pending", "Rejected"]
    const [responders, setResponders] = useState(null);
    useEffect(() => {
        const fetchResponders = async () => {
            const dummyUsers = [
                { id: 1, name: "John Doe", status: "Pending", region: "North", phone: "123-456-7890", registered_date: "2026-01-15" },
                { id: 2, name: "Jane Smith", status: "Approved", region: "South", phone: "098-765-4321", registered_date: "2026-01-18" },
                { id: 3, name: "Michael Johnson", status: "Rejected", region: "East", phone: "555-123-4567", registered_date: "2026-01-20" },
                { id: 4, name: "Emily Davis", status: "Approved", region: "West", phone: "444-987-6543", registered_date: "2026-01-25" },
                { id: 5, name: "Chris Brown", status: "Pending", region: "Central", phone: "333-555-7890", registered_date: "2026-02-01" },
                { id: 6, name: "Sarah Wilson", status: "Approved", region: "North", phone: "222-333-4444", registered_date: "2026-02-03" },
                { id: 7, name: "David Miller", status: "Pending", region: "South", phone: "777-888-9999", registered_date: "2026-02-05" },
                { id: 8, name: "Jessica Taylor", status: "Rejected", region: "East", phone: "666-222-1111", registered_date: "2026-02-10" },
                { id: 9, name: "Matthew Anderson", status: "Approved", region: "West", phone: "999-444-5555", registered_date: "2026-02-12" },
                { id: 10, name: "Ashley Thomas", status: "Pending", region: "Central", phone: "111-222-3333", registered_date: "2026-02-14" },
                { id: 11, name: "Daniel Martinez", status: "Approved", region: "North", phone: "888-777-6666", registered_date: "2026-02-15" },
                { id: 12, name: "Amanda Garcia", status: "Rejected", region: "South", phone: "555-666-7777", registered_date: "2026-02-18" },
                { id: 13, name: "James Robinson", status: "Pending", region: "East", phone: "444-333-2222", registered_date: "2026-02-20" },
                { id: 14, name: "Laura Clark", status: "Approved", region: "West", phone: "333-222-1111", registered_date: "2026-02-22" },
                { id: 15, name: "Robert Lewis", status: "Approved", region: "Central", phone: "222-111-0000", registered_date: "2026-02-23" }
            ];
            await new Promise(resolve => setTimeout(resolve, 2000));
            setResponders(dummyUsers);
        }
        fetchResponders();
    }, []);
    return (
        <div className="admin-approval-container">
            <h1>Admin Approval Page</h1>
            <div className="line admin-approval-line" ></div>
            <SearchBar filter_options={filter_options}
                dropDownMaxHeight={120}
                secondaryHeight={120}
            />
            <div className="admin-aproval-cards-list">
                {
                    responders?.length > 0 && responders.map((r, i) =>
                        <AnimateInView delay={(i % 3) * 0.15} key={`responder-${r.id}-${i}`}>
                            <ResponderRequestCard data_object={r} />
                        </AnimateInView>)
                }
            </div>
        </div>
    );
}