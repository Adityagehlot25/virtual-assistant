import React, { createContext } from 'react';

export const UserDataContext = createContext();

export function UserDataProvider({ children }) {
    const server = "http://localhost:8000";
    return (
        <UserDataContext.Provider value={{ server }}>
            {children}
        </UserDataContext.Provider>
    );
}
