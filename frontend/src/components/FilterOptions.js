import React, { useContext } from "react";
import { MyContext } from "../MyContext";

export default function FilterOptions({ onClickFunction, filterClicked, optionValue }) { 
    const { isDarkMode } = useContext(MyContext);

    return (
        <div onClick={onClickFunction} className={`border-[1px] ${isDarkMode === 'On' ? 'border-[color:--text-light-gray] bg-[color:--background-gray] hover:bg-[color:--text-light-gray] hover:text-[color:--background-gray]' : 'border-[color:--background-gray] bg-[color:--text-light-gray] hover:bg-[color:--background-gray] hover:text-[color:--text-light-gray]'} ${filterClicked ? 'animate-fadeInChildren' : 'animate-fadeOutChildren'}`}>
            {optionValue}
        </div>
    )
}