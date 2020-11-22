import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPageContainer from "./containers/LoginPageContainer";
import MainUserPageContainer from "./containers/LoginPageContainer/MainUserPageContainer";
import { useRedirect } from "./services/useRedirect";
import { history } from "./helpers/history";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {useRedirect("main") || <LoginPageContainer />}
          </Route>
          <Route exact path="/main">
            {useRedirect() || <MainUserPageContainer />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
