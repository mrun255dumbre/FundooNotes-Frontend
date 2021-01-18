import React, { useState, useContext, useEffect } from 'react';
import logo from '../assets/images/logo.png';
import './login.scss';
import { useParams, Link, withRouter } from 'react-router-dom';
import userService from '../services/user-service';
import { AppContext } from '../utils/AppContext';

const ResetPassword = (props) => {
    const { token = '0' } = useParams();
    let initialValue = {
        password: '',
        error: {
            password: '',
            confirmPassword: ''
        }
    }
    const [userData, setUserData] = useState(initialValue);
    const { history } = props;
    const {user, handleClick} = useContext(AppContext);

    useEffect(()=>{
        if(user){
          history.push("/")
        }
      },[user]);

    const validData = async () => {
        let isError = false;
        let error = {
            password: '',
            confirmPassword: ''
        }
        const passwordRegex = RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&-+=]).{8,20}$');

        if (userData.password.length < 1) {
            error.password = 'Password is required field';
            isError = true;
        } else if(!userData.password.match(passwordRegex)) {
            error.password = "Use at least 8 characters, 1 Upper Case and 1 special character";
            isError = true;
        }

        if (userData.confirmPassword.length < 1) {
            error.password = 'Confirm Password is required field';
            isError = true;
        } else if(userData.password !== userData.confirmPassword) {
            error.password = "Password doesnt match";
            isError = true;
        }

        await setUserData({ ...userData, error: error })
        return isError;
    }

    const formSubmit = async (event) => {
        event.preventDefault();
        if (await validData()) {
            console.log('error', userData);
            return;
        }
        userService.resetPassword(token,userData.password).then(response => {
            if (response.status === 200) {
                window.alert("Password updated successfully");
                history.push('/login');
            } else {
                window.alert("Unable to update password");
            }
        }).catch((error) => {
            if (error.response) {
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
                    <img className="logo" src={logo} />
                </div>
            </div>
            <div className="form-content">
                <div className="form">
                    <h2>Reset Password</h2>
                    <div className="formContent">
                        <div className="row-content">
                            <input className="input" type="password" name="email" value={userData.password || ''} onChange={event => { setUserData({ ...userData, password: event.target.value }) }} placeholder=" " required />
                            <label>New Password</label>
                            <div className="error">{userData.error.password}</div>
                        </div>
                        <div className="row-content">
                            <input className="input" type="password" name="email" value={userData.confirmPassword || ''} onChange={event => { setUserData({ ...userData, confirmPassword: event.target.value }) }} placeholder=" " required />
                            <label>Confirm Password</label>
                            <div className="error">{userData.error.confirmPassword}</div>
                        </div>
                        <div className="submit-button">
                            <button onClick={formSubmit} className="button">Reset Password</button>
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

export default withRouter(ResetPassword);