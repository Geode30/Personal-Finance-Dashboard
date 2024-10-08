import React, { useContext } from "react";
import { MyContext } from "../MyContext";

export default function CustomButton({ onClickFunction, buttonValue, customStyles }) {
    const { isDarkMode } = useContext(MyContext);

    return (
        <button
            onClick={onClickFunction}
            className={`${customStyles ? customStyles : `${isDarkMode === 'On' ? 'bg-[color:--background-dark-slate] text-[color:--text-light-gray] border-[color:--text-light-gray] hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray]' : 'bg-[color:--text-light-gray] text-[color:--background-dark-slate] border-[color:--border-dark-gray] hover:bg-[color:--background-dark-slate] hover:text-[color:--text-light-gray] hover:border-[color:--border-dark-gray]'}`} border-2 rounded-[10px] mt-[1.5em] p-[0.5em] font-bold hover:cursor-pointer transition-all duration-[0.3s] ease-in-out`}>
            {buttonValue}
        </button>
    )
}