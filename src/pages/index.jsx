import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "../app/NotFound";
import { ProtectedRoute } from "../common/ProtectedRoute";
import { Archived } from "./Archived";
import { Note } from "./Note";
import { Trash } from "./Trash";

const InnerRouting = () => {
    return (
        <Switch>
            <ProtectedRoute exact path="/" component={Note} />
            <ProtectedRoute exact path="/archived" component={Archived} />
            <ProtectedRoute exact path="/trash" component={Trash} />
            
            <Route component={NotFound} />
        </Switch>
    );
};
export { InnerRouting };
