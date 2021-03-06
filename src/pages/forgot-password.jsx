import React, { useState, useContext } from 'react';
import logo from '../assets/images/logo.png';
import './login.scss';
import { Link, withRouter } from 'react-router-dom';
import userService from '../services/user-service';
import { AppContext } from '../utils/AppContext';

const ForgotPassword = (props) => {
    const [userData, setuserData] = useState({});
    const {handleClick} = useContext(AppContext);
    const {history} = props;
    const formSubmit = () => {
        if(!userData.email){ 
            window.alert("please enter email address");
            return;
        }
        
        userService.forgotPassword(userData).then(response => {
            if(response.data){
                window.alert("Password reset link sent to your email");
                history.push('/login');
            } else{
                window.alert("Please enter correct Email");
            }
        }).catch((error) => {
            if (error.response){
              handleClick(error.response.data.data);
            }  
            else
              handleClick("Please try again");
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
                    <h2>Forgot Password</h2>
                    <div className="formContent">
                        <div className="row-content">
                            <input className="input" type="text" name="email" value={userData.email || ''} onChange={event => {setuserData({...userData, email:event.target.value})}} placeholder=" " required/>
                            <label>Email</label>
                        </div>
                        <div className="submit-button">
                            <button onClick={formSubmit} className="button">Submit</button>
                        </div>
                    </div>
                    <div className="row-button">
                        <Link to="/login">Click here to Sign In</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(ForgotPassword);