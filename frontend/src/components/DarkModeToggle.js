import React, { useContext } from "react";
import { MyContext } from "../MyContext";

export default function DarkModeToggle({ mbValue, mtValue }) { 
    const { isDarkMode, setIsDarkMode } = useContext(MyContext);

    const handleToggle = () => {
        if (isDarkMode === 'On') {
            setIsDarkMode('Off');
        } else {
            setIsDarkMode('On');
        }
    };

    return (
        <div
            onClick={handleToggle}
            className={`${isDarkMode === 'On' ? 'toggle-dark-mode-on-bg' : 'toggle-dark-mode-off-bg'} w-[5em] flex items-center ml-auto mr-[2em] ${mtValue ? mtValue : 'mt-[2em]'} ${mbValue} h-[2.5em] border-[2px] rounded-[20px] hover:cursor-pointer transition-all duration-[1s] ease-in-out`}>
            <div className={`${isDarkMode === 'On' ? 'toggle-dark-mode-on toggle-dark-mode-on-button bg-[color:--background-gray]' : 'toggle-dark-mode-off toggle-dark-mode-off-button bg-[color:--text-light-gray]'} w-[1.8em] h-[1.5em] ml-auto mr-[0.5em] rounded-[12px] transition-all duration-[1s] ease-in-out`}>
            </div>
        </div>
    );
}
