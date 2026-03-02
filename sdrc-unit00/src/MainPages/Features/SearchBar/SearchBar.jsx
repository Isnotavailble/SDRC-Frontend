import { useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import { Search } from "lucide-react";
import { getRecentDateRange } from "../../../Util/timeUnitConverter";
/*
filter_optins :  [] string
Note : I use search icon in line styling ..
*/
export default function SearchBar({ filter_options, needSearch, filter_handler }) {

    const [selectedDate, setSelectedDate] = useState({});
    const [dateFilterOpened, setDateFilterOpened] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(filter_options[0]);
    useEffect(() => {
        const { startDate, endDate } = getRecentDateRange(60);
        setSelectedDate(({ start_date: startDate, end_date: endDate }));
    }, []);

    return (
        <div className="searchbar-container">
            {/*filter button list*/}

            <div className="filter-buttons" style={{ marginLeft: needSearch ? "20px" : "0px" }}>
                {
                    filter_options && filter_options.map((b, i) => {
                        if (b === "by time")
                            return (

                                <div className="date-filter-container">
                                    <button className={selectedFilter === "by time" && "search-filter-clicked"}
                                        onClick={() => {
                                            setDateFilterOpened(p => !p);
                                            setSelectedFilter("by time");
                                        }}>By Time</button>
                                    <div className={`date-filter-drop ${dateFilterOpened ? "" : "close"}`}>
                                        <div>
                                            <input type="date" value={selectedDate.start_date} onChange={(e) => setSelectedDate(p => ({ ...p, start_date: e.target.value }))} />
                                        </div>
                                        <div>
                                            <input type="date" value={selectedDate.end_date} onChange={(e) => setSelectedDate(p => ({ ...p, end_date: e.target.value }))} />
                                        </div>

                                        {selectedDate && <button onClick={() => {
                                            filter_handler("by time", selectedDate.start_date, selectedDate.end_date, setSelectedDate);
                                            setDateFilterOpened(p => !p);
                                        }}

                                        >Search</button>}
                                    </div>
                                </div>

                            );
                        return (
                            <button className={selectedFilter === b ? "search-filter-clicked" : ""} key={i}
                                onClick={() => { filter_handler(b, selectedDate.start_date, selectedDate.end_date, setSelectedDate); setSelectedFilter(b); }} >{b}
                            </button>)
                    })
                }
            </div>
        </div >

    );
}