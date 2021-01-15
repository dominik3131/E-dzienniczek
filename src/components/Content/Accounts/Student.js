import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Subjects from "../Subjects/Subjects";
import Messages from "../Messages/Messages";

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
            <Route path={`${path}/messages`} exact component={Messages} />
        </Switch>
    );
}
 
export default Student;