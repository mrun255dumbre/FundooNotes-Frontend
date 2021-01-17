import React, { useState, useEffect, useContext } from 'react';
import logo from '../assets/images/logo.png';
import './login.scss';
import { useParams, Link, withRouter } from 'react-router-dom';
import { AppContext } from '../utils/AppContext';
import userService from '../services/user-service';
import axiosService from '../services/axios-service';

const Login = (props) => {
    const {user, setUser} = useContext(AppContext);
    const [loginData, setLoginData] = useState({});
    const {history} = props;

    useEffect(()=>{
      if(user){
        history.push("/")
      }
    },[user]);

    const formSubmit = () => {

        if(!loginData.email){ 
            window.alert("please enter email address");
            return;
        }
        if(!loginData.password){ 
            window.alert("please enter password");
            return;
        }
        
        userService.login(loginData).then(response => {
            if(response.data.data){
                setUser(response.data.data);
                axiosService.setToken(response.data.data)
                history.push('/');
            } else{
                window.alert("Please enter correct username and password");
            }
        })
        
    }   
    return (
        <>
            <div className="navigation-bar">
                <div className="navigation-container">
                    <img className="logo" src={logo}/>
                </div>
            </div>
            <div className="form-content">
                <div className="form">
                    <h2>Sign In</h2>
                    <div className="formContent">
                        <div className="row-content">
                            <input type="text" name="email" value={loginData.email || ''} onChange={event => {setLoginData({...loginData, email:event.target.value})}} placeholder=" " required/>
                            <label>Email</label>
                        </div>
                        <div className="row-content">
                            <input type="password" name="password" value={loginData.password || ''} onChange={event => {setLoginData({...loginData, password:event.target.value})}} placeholder=" " required/>
                            <label>Password</label>
                        </div>
                        <div className="submit-button">
                            <button onClick={formSubmit} className="button">Login</button>
                        </div>
                    </div>
                    <div className="row-button">
                        <Link to="/signup">Click here to Sign Up</Link>
                    </div>
                    <div className="row-button mt-5">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(Login);