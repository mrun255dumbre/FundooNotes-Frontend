import React, { useState, useEffect, useContext } from 'react';
import logo from '../assets/images/logo.png';
import './login.scss';
import { withRouter } from 'react-router-dom';
import { AppContext } from '../appContext';

const Home = (props) => {
    const {user, setUser} = useContext(AppContext);
    return (
        <>
            <div className="navigation-bar">
                <div className="navigation-container">
                    <img className="logo" src={logo}/>
                </div>
            </div>
            <div className="form-content">
                <div className="form">
                    <h2>Login Successful!</h2>
                    
                </div>
            </div>
        </>
    )
}

export default withRouter(Home);