import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export function AppProvider({ children }) {
    const [appColor, setAppColor] = useState('#6F9EEB');
    const [companyName, setCompanyName] = useState('Company Name');
    const [Admin, setAdmin] = useState(false);
    const [userWidgets, setUserWidgets] = useState([]);
    const [localUri, setLocalUri] = useState("");

    const contextValue = {
        appColor,
        setAppColor,
        companyName,
        setCompanyName,
        Admin,
        setAdmin,
        userWidgets,
        setUserWidgets,
        setLocalUri,
        localUri,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}
