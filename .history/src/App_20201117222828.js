import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import LoginPageContainer from "./containers/LoginPageContainer";
import MainUserPageContainer from "./containers/LoginPageContainer/MainUserPageContainer";
import { useUserLoggedIn } from "./services/useUserLoggedIn";

function App() {
  const authKey = useUserLoggedIn();
  // console.log(authKey);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={LoginPageContainer} />
          <Route exact path="/main">
            {!authKey ? <Redirect to="/" /> : <MainUserPageContainer />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
