
import React, { createContext } from "react";

import useTheme from "../hooks/useTheme";

export const userDataContext = createContext();

function UserDataProvider({ children, startingTheme }) {
    const { data } = useTheme(startingTheme);

    return (
        <UserDataProvider.Provider value={{ data }}>
            {children}
        </UserDataProvider.Provider>
    );
}

export { UserDataProvider };
