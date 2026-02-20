import { useRef, useState } from "react";
import "./SearchBar.css";
import { Search } from "lucide-react";
/*
filter_optins :  [] string
add_options :  add btn label
Note : I use search icon in line styling ..
*/
export default function SearchBar({ filter_options }) {
    const drop = useRef({});
    const [selectedType,setSelectedType] = useState(null);

    //drop down height handler
    function dropDownHandler(refKey, heightTo) {
        const el = drop.current[refKey];
        el.style.height = el.style.height !== `${heightTo}px` ? `${heightTo}px` : "0px";
    }

    return (
        <div className="searchbar-container">
            {/*search bar div*/}
            <div className="searchbar-box">
                <Search className="searchbar-icon" strokeWidth={2} color="#807e7e" size={20} />
                <input placeholder="search resource by..." type="text" autoCorrect="" />
                <button className="filter-button" onClick={() => { dropDownHandler("filter_drop", 120) }}>{selectedType || "Filter"}</button>

                <div className="filter-drop-box">
                    <div className="filter-dropdown" ref={el => { if (el) drop.current["filter_drop"] = el }}>
                        {filter_options.slice(1).map((o, i) => <button key={i} onClick={() => {dropDownHandler("filter_drop",120);setSelectedType(o)}}>{o}</button>)}
                    </div>
                </div>

                <button className="search-btn">Search</button>
            </div>
            {/*filter button list*/}

            <div className="filter-buttons">
                {
                    filter_options && filter_options.map((b, i) =>
                        <button key={i} >{b}</button>
                )
                }
            </div>
        </div>

    );
}