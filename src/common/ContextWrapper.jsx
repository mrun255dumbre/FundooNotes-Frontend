import React, { useEffect, useState } from 'react';
import axiosService from '../services/axios-service';
import { AppContext } from '../utils/AppContext';
import { ViewTypes } from '../utils/constants';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const ContextWrapper = ({ children }) => {
    const [user, setUserData] = useState(null);
    const [viewType, setViewType] = useState(ViewTypes.Grid);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState(null);

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

    const handleClick = (message) => {
        setMessage(message);
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    return (
        <AppContext.Provider value={{
            user, setUser, logout, viewType, setViewType, handleClick
        }}>
            { children}
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            />
        </AppContext.Provider>
    );
}

export { ContextWrapper };