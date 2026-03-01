import { useRef, useState } from "react";
import "./SearchBar.css";
import { Search } from "lucide-react";
/*
filter_optins :  [] string
add_options :  add btn label
Note : I use search icon in line styling ..
*/
export default function SearchBar({ filter_options,
    dropDownMaxHeight,
    secondary_filter_options,
    secondaryHeight, needSearch, filter_handler }) {
    const drop = useRef({});
    const dropMode = ["by parents", "by fields"]
    const [selectedType, setSelectedType] = useState(null);
    const [selectedField, setSelectedField] = useState(null)
    const [dropDownMode, setDropDownMode] = useState(dropMode[0]);
    const [selectedDate, setSelectedDate] = useState({});
    const [dateFilterOpened, setDateFilterOpened] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(filter_options[0]);
    //drop down height handler
    function dropDownHandler(refKey, button, data) {
        // 1. Define 'el' up here so all the 'if' blocks can see it!
        const el = drop.current[refKey];
        if (!el) return; // Quick safety check

        if (button === "type") {
            // Quick tip: Inline styles are often "" (empty) on the first click, not "0px"
            // So it's safer to check if it's already open, and if not, open it.
            el.style.height = (el.style.height === `${dropDownMaxHeight}px`) ? "0px" : `${dropDownMaxHeight}px`;
            setDropDownMode(dropMode[0]);
            return;
        }

        if (button === "parent") {
            setDropDownMode(dropMode[1]);
            setSelectedType(data);
            // 2. This works now because 'el' is defined at the top
            el.style.height = `${secondaryHeight}px`;
            return;
        }

        if (button === "child") {
            setDropDownMode(dropMode[0]);

            if (secondary_filter_options?.length > 0)
                setSelectedField(data);

            else
                setSelectedType(data);

            el.style.height = "0px";
            return;
        }
    }


    return (
        <div className="searchbar-container">
            {/*search bar div*/}
            {needSearch &&
                <div className="searchbar-box">


                    <Search className="searchbar-icon" strokeWidth={2} color="#807e7e" size={20} />
                    <input placeholder="search resource by..." type="text" autoCorrect="" />
                    <button className="filter-button" onClick={() => { dropDownHandler("filter_drop", "type") }}>{selectedType || "Filter"}</button>

                    <div className="filter-drop-box">
                        <div className="filter-dropdown" ref={el => { if (el) drop.current["filter_drop"] = el }}>

                            {dropDownMode === dropMode[0] &&
                                filter_options.slice(1).map((o, i) =>
                                    <button key={"type-" + i} onClick={() => dropDownHandler("filter_drop", secondary_filter_options?.length > 0 ? "parent" : "child", o)}>
                                        {o}
                                    </button>)
                            }

                            {dropDownMode === dropMode[1] &&
                                secondary_filter_options.map((o, i) =>
                                    <button key={"field-" + i} onClick={() => dropDownHandler("filter_drop", "child", o)}>
                                        {o}
                                    </button>)
                            }
                        </div>
                    </div>

                    <button className="search-btn">Search</button>
                </div>}
            {/*filter button list*/}

            <div className="filter-buttons" style={{ marginLeft: needSearch ? "20px" : "0px" }}>
                {
                    filter_options && filter_options.map((b, i) =>
                        <button className={selectedFilter === b ? "search-filter-clicked" : ""} key={i}
                            onClick={() => { filter_handler(b, selectedDate.start_date, selectedDate.end_date); setSelectedFilter(b); }} >{b}</button>
                    )
                }
                <div className="date-filter-container">
                    <button className={selectedFilter === "by time" && "search-filter-clicked"}
                        onClick={() => {
                            setDateFilterOpened(p => !p);
                            setSelectedFilter("by time");
                        }}>By Time</button>
                    <div className={`date-filter-drop ${dateFilterOpened ? "" : "close"}`}>
                        <div>
                            <input type="date" onChange={(e) => setSelectedDate(p => ({ ...p, start_date: e.target.value }))} />
                        </div>
                        <div>
                            <input type="date" onChange={(e) => setSelectedDate(p => ({ ...p, end_date: e.target.value }))} />
                        </div>

                        {selectedDate && <button onClick={() => { filter_handler("by time", selectedDate.start_date, selectedDate.end_date); setDateFilterOpened(p => !p); }}>Search</button>}
                    </div>
                </div>

            </div>
        </div >

    );
}