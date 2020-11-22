import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginPageContainer from "./containers/LoginPageContainer";
import MainUserPageContainer from "./containers/LoginPageContainer/MainUserPageContainer";
import { useUserLoggedIn } from "./services/useUserLoggedIn";
import { history } from "./helpers/history";

function App() {
  const authKey = useUserLoggedIn();
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path={["/", "/login"]}>
            {authKey ? <Redirect to="/users" /> : <LoginPageContainer />}
          </Route>
          <Route exact path="/users">
            {authKey ? <MainUserPageContainer /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
