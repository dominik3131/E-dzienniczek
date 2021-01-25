import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ReceviedMessages from "../Messages/ReceivedMessages";
import SentMessages from "../Messages/SentMessages";
import ShowSingleMessage from "../Messages/ShowSingleMessage";
import NewMessage from "../Messages/NewMessage";
import AnnouncementList from "../Announcement/AnnouncementList";
import Classes from "../TeacherClasses/Classes";
import ClassesTabs from "../TeacherClasses/ClassesTabs";

const Student = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <p>Komponent</p>
      </Route>
      <Route path={`${path}/class`} exact component={Classes} />
      <Route
        path={`${path}/class/:classId/:subjectId`}
        exact
        component={ClassesTabs}
      />
      <Route path={`${path}/polls`} exact>
        <div>Komponent polls</div>
      </Route>
      <Route
        path={`${path}/announcements/create`}
        exact
        component={AnnouncementList}
      />
      <Route
        path={`${path}/messages/received`}
        exact
        component={ReceviedMessages}
      />
      <Route path={`${path}/messages/sent`} exact component={SentMessages} />
      <Route
        path={`${path}/messages/received/:id`}
        exact
        component={ShowSingleMessage}
      />
      <Route
        path={`${path}/messages/sent/:id`}
        exact
        component={ShowSingleMessage}
      />
      <Route path={`${path}/messages/new`} exact component={NewMessage} />
    </Switch>
  );
};

export default Student;
