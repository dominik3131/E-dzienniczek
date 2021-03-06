import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPageContainer from "./containers/LoginPageContainer";
import MainUserPageContainer from "./containers/LoginPageContainer/MainUserPageContainer";
import { useUserLoggedIn } from "./services/useUserLoggedIn";
import { useRedirect } from "./services/useRedirect";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={LoginPageContainer} />
          <Route exact path="/main">
            {useRedirect() || <MainUserPageContainer />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
