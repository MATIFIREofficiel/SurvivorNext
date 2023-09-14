import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export function AppProvider({ children }) {
    const [appColor, setAppColor] = useState('#6F9EEB');
    const [companyName, setCompanyName] = useState('');

    const contextValue = {
        appColor,
        setAppColor,
        companyName,
        setCompanyName,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}
