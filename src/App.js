import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginPageContainer from "./containers/LoginPageContainer";
import MainUserPageContainer from "./containers/LoginPageContainer/MainUserPageContainer";
import AnnouncementList from "./components/Content/Announcement/AnnouncementList";
import AnnouncementCreateForm from "./components/Content/Announcement/AnnouncementCreateForm";
import { useUserLoggedIn } from "./services/useUserLoggedIn";
import { history } from "./helpers/history";
import UserCreateForm from "./components/Content/Users/UserCreateForm";

function App() {
  const authKey = useUserLoggedIn();
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path={["/", "/login"]}>
            {authKey ? <Redirect to="/users" /> : <LoginPageContainer />}
          </Route>
          <Route path="/users">
            {authKey ? <MainUserPageContainer /> : <Redirect to="/" />}
          </Route>
          <Route path="/create">
            {authKey ? <UserCreateForm /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/announcements">
            {authKey ? <AnnouncementList /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/announcements/create">
            {authKey ? <AnnouncementCreateForm /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
