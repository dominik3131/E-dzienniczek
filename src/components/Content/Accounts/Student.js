import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Subjects from "../Subjects/Subjects";

const Student = () => {
    const { path } = useRouteMatch();
    return ( 
        <Switch>
            <Route exact path={path}>
                <p>Komponent</p>
            </Route>
            <Route path={`${path}/subjects`} exact component={Subjects} />
            <Route path={`${path}/polls`} exact>
                <div>Komponent polls</div>
            </Route>
            <Route path={`${path}/announcements`} exact>
                <div>Komponent announcements</div>
            </Route>
            <Route path={`${path}/messages`} exact>
                <div>Komponent messages</div>
            </Route>
        </Switch>
    );
}
 
export default Student;