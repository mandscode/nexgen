import { createContext, useEffect, useState } from "react";
import {AppStore} from "./AppStore"
import React from "react";

export const AppContext = createContext<AppStore>({} as any);

const AppContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuthenticated(true); // Restore authentication state
            setLoading(false)
        } else {
            setLoading(false)
        }
    }, []);

    return (<AppContext.Provider value={{ isAuthenticated, setAuthenticated, isLoading  }}>{children}</AppContext.Provider>)
}

export default AppContextProvider;