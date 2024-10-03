import React from "react";

export default function CustomButton({ onClickFunction, buttonValue, customStyles }) {
    return (
        <button
            onClick={onClickFunction}
            className={`${customStyles ? customStyles : 'bg-[color:--background-dark-slate] text-[color:--text-light-gray]'} border-2 rounded-[10px] mt-[1.5em] p-[0.5em] font-bold hover:cursor-pointer hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray] transition-all duration-[0.3s] ease-in-out`}>
            {buttonValue}
        </button>
    )
}