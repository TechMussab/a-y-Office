import React, { createContext, useState } from "react";

export const ApiContext = createContext();

function ThemeProvider({ children, defaultApi }) {
    const [api, setApi] = useState(defaultApi);

    return (
        <ApiContext.Provider value={{ api, setApi }}>
            {children}
        </ApiContext.Provider>
    );
}

export { ThemeProvider };