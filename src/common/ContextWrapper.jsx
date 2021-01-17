import React, { useEffect, useState } from 'react';
import axiosService from '../services/axios-service';
import { AppContext } from '../utils/AppContext';
import { ViewTypes } from '../utils/constants';

const ContextWrapper = ({ children }) => {
    const [user, setUserData] = useState(null);
    const [viewType, setViewType] = useState(ViewTypes.Grid);

    useEffect(() => {
        let currentUser = localStorage.getItem("user")
        if (currentUser) {
            setUserData(JSON.parse(currentUser))
            axiosService.setToken(currentUser)
        }
    }, [])

    const setUser = (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUserData(data)
    }

    const logout = () => {
        localStorage.removeItem("user");
        setUserData(null)
        axiosService.setToken("")
    }

    return (
        <AppContext.Provider value={{
            user, setUser, logout, viewType, setViewType
        }}>
            { children}
        </AppContext.Provider>
    );
}

export { ContextWrapper };