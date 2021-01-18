import React, { useState, useEffect, useContext } from 'react';
import logo from '../assets/images/logo.png';
import './login.scss';
import { Link, withRouter } from 'react-router-dom';
import userService from '../services/user-service';
import { AppContext } from '../utils/AppContext';

const Registration = (props) => {   
    const {user, handleClick} = useContext(AppContext);
    const {history} = props;
    let initialValue = {
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
        error: {
            username: '',
            password: '',
            email: '',
            phoneNumber: ''
        }
    }

    useEffect(()=>{
        if(user){
          history.push("/")
        }
      },[user]);

    const [registrationData, setRegistrationData] = useState(initialValue);
    const validData = async () => {
        let isError = false;
        let error = {
            username: '',
            password: '',
            email: '',
            phoneNumber: ''
        }
        const usernameRegex = '^[A-Z][a-zA-Z]{2,}([ ][A-Z]([a-z]{1,})*)*$';
        const phoneNumberRegex = RegExp('^([\+]?[0-9]{2})?[-\.]?[ ]?[0-9]{10}$');
        const emailRegex = RegExp('^([a-zA-Z0-9]+[+_.-]?[a-zA-Z0-9]+)+@[a-zA-Z0-9-]+.[a-z]{2,3}.[a-z]{2,3}$');
        const passwordRegex = RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&-+=]).{8,20}$');

        if (registrationData.username.length < 1) {
            error.username = 'Username is required field';
            isError = true;
        } else if(!registrationData.username.match(usernameRegex)) {
            error.username = "First letter should be in upper case";
            isError = true;
        }

        if (registrationData.password.length < 1) {
            error.password = 'Password is required field';
            isError = true;
        } else if(!registrationData.password.match(passwordRegex)) {
            error.password = "Use at least 8 characters, 1 Upper Case and 1 special character";
            isError = true;
        }

        if(registrationData.email.length < 1) {
            error.email = 'Email is required field';
            isError = true;
        } else if(!registrationData.email.match(emailRegex)) {
            error.email = "Please enter valid email";
            isError = true;
        }
        if (registrationData.phoneNumber.length < 1) {
            error.phoneNumber = 'Phone Number is required field';
            isError = true;
        } else if (!registrationData.phoneNumber.match(phoneNumberRegex)) {
            error.phoneNumber = "Please enter valid Phone Number";
            isError = true;
        }
        await setRegistrationData({ ...registrationData, error: error })
        return isError;
    }

    const formSubmit = async (event) => {
        event.preventDefault();

        if (await validData()) {
            console.log('error', registrationData);
            return;
        }

        userService.registration(registrationData).then(response => {
            if(response.data.data){
                window.alert("Registration Successful!");
                history.push('/login');
            } else{
                window.alert(response.data.message);
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
                    <h2>Sign Up</h2>
                    <div className="formContent">
                        <div className="row-content">
                            <input className="input" type="text" name="username" value={registrationData.username} onChange={event => {setRegistrationData({...registrationData, username:event.target.value})}} placeholder=" " required/>
                            <label>User Name</label>
                            <div className="error">{registrationData.error.username}</div>
                        </div>
                        <div className="row-content">
                            <input className="input" type="password" name="password" value={registrationData.password} onChange={event => {setRegistrationData({...registrationData, password:event.target.value})}} placeholder=" " required/>
                            <label>Password</label>
                            <div className="error">{registrationData.error.password}</div>
                        </div>
                        <div className="row-content">
                            <input className="input" type="email" name="email" value={registrationData.email} onChange={event => {setRegistrationData({...registrationData, email:event.target.value})}} placeholder=" " required/>
                            <label>Email</label>
                            <div className="error">{registrationData.error.email}</div>
                        </div>
                        <div className="row-content">
                            <input className="input" type="tel" name="phoneNumber" value={registrationData.phoneNumber} onChange={event => {setRegistrationData({...registrationData, phoneNumber:event.target.value})}} placeholder=" " required/>
                            <label>Phone Number</label>  
                            <div className="error">{registrationData.error.phoneNumber}</div>
                        </div>
                        <div className="submit-button">
                            <button onClick={formSubmit} className="button">Register</button>
                        </div>
                        <div className="row-button">
                            <Link to="/login">Click here to Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(Registration);