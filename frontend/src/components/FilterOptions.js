import React from "react";

export default function FilterOptions({ onClickFunction, filterClicked, optionValue }) { 
    return (
        <div onClick={onClickFunction} className={`border-[1px] hover:bg-[color:--text-light-gray] hover:text-[color:--background-gray] ${filterClicked ? 'animate-fadeInChildren' : 'animate-fadeOutChildren'}`}>
            {optionValue}
        </div>
    )
}