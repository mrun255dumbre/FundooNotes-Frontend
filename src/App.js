import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from "react-router-dom";
import Login from './components/login';
import Registration from './components/registration';
import Home from "./components/home";
import { AppContext } from './appContext';
import ForgotPassword from './components/forgot-password';
import ResetPassword from './components/reset-password';

function App() {
  const [user, setUser] = useState(null);
  return (
    <AppContext.Provider value={{
      user, setUser
    }}>
     <div class="app">
        <Router>
          <Switch>
            <Route exact path="/" render={() => user ? <Home/> : <Redirect to="/login"/> } />
            <Route exact path="/signup" component={Registration} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password" component={ResetPassword} />
          </Switch>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
