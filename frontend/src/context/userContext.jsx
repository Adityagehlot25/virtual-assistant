import React, { createContext } from 'react';

export const UserDataContext = createContext();

export function UserDataProvider({ children }) {
    const server = "http://localhost:8000";
    const [userData, setUserData] = React.useState(null);
    const handleCurrentUser = async() => {
        try {
            const response = await fetch(`${server}/api/user/current`, {
                withCredentials: 'true',
            });
            setUserData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
    return (
        <UserDataContext.Provider value={{ server, userData, handleCurrentUser }}>
            {children}
        </UserDataContext.Provider>
    );
}
