import { createContext, useState } from "react";
import {AppStore} from "./AppStore"
import React from "react";

export const AppContext = createContext<AppStore>({} as any);

const AppContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

    return (<AppContext.Provider value={{ isAuthenticated, setAuthenticated }}>{children}</AppContext.Provider>)
}

export default AppContextProvider;