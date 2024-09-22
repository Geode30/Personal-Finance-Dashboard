import React, { createContext, useEffect, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || 'No Token');

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    return (
        <MyContext.Provider value={{ token, setToken }}>
            {children}
        </MyContext.Provider>
    );
};