import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import { NotFound } from "../app/NotFound";
import { ProtectedRoute } from "../common/ProtectedRoute";

const InnerRouting = () => {
    return (
        <Switch>
            <ProtectedRoute exact path="/" component={Dashboard} />
            {/* inner pages -  notes */}
            <Route component={NotFound} />
        </Switch>
    );
};
export { InnerRouting };
