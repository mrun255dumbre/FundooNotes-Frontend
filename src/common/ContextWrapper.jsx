import React, { useEffect, useState } from 'react';
import { AppContext } from '../utils/AppContext';

const ContextWrapper = ({ children }) => {
    const [user, setUserData] = useState(null);

    useEffect(() => {
        let currentUser = localStorage.getItem("user")
        if (currentUser) {
            setUserData(JSON.parse(currentUser))
        }
    }, [])

    const setUser = (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUserData(data)
    }

    const logout = () => {
        localStorage.removeItem("user");
        setUserData(null)
    }

    return (
        <AppContext.Provider value={{
            user, setUser, logout
        }}>
            { children}
        </AppContext.Provider>
    );
}

export { ContextWrapper };