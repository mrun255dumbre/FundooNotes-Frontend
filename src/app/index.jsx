import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NotFound } from "./NotFound";
import { ThemeWrapper } from "./ThemeWrapper";
import { InnerRouting } from "../pages";
import { ContextWrapper } from "../common/ContextWrapper";
import ForgotPassword from '../pages/forgot-password';
import ResetPassword from '../pages/reset-password';
import Login from '../pages/login';
import Registration from '../pages/registration';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const ParentRouting = () => {
    return (
        <ThemeWrapper>
            <Switch>
                <Route path="/" component={InnerRouting} />
                <Route component={NotFound} />
            </Switch>
        </ThemeWrapper>
    );

}

const App = () => {
    return (
        <ContextWrapper>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/signup" component={Registration} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/forgot-password" component={ForgotPassword} />
                    <Route exact path="/reset-password/:token?" component={ResetPassword} />
                    <Route path="/" component={ParentRouting} />
                </Switch>
            </BrowserRouter>
        </ContextWrapper>
    )
};

export { App };