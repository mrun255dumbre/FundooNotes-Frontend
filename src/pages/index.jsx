import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "../app/NotFound";
import { ProtectedRoute } from "../common/ProtectedRoute";
import { Archived } from "./Archived";
import { LabelList } from "./LabelList";
import { Note } from "./Note";
import { SearchPage } from "./SearchPage";
import { Trash } from "./Trash";

const InnerRouting = () => {
    return (
        <Switch>
            <ProtectedRoute exact path="/" component={Note} />
            <ProtectedRoute exact path="/archived" component={Archived} />
            <ProtectedRoute exact path="/trash" component={Trash} />
            <ProtectedRoute exact path="/label/:labelId?" component={LabelList} />
            <ProtectedRoute exact path="/search/:searchText?" component={SearchPage} />

            <Route component={NotFound} />
        </Switch>
    );
};
export { InnerRouting };
