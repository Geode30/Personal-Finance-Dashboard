import React, { createContext, useEffect, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || 'No Token');
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('dark_mode') || 'Off');

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    useEffect(() => { 
        localStorage.setItem('dark_mode', isDarkMode);
    }, [isDarkMode])

    return (
        <MyContext.Provider value={{ token, setToken, isDarkMode, setIsDarkMode }}>
            {children}
        </MyContext.Provider>
    );
};