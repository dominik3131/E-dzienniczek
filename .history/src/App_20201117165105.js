import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPageContainer from "./containers/LoginPageContainer";
import MainUserPageContainer from "./containers/LoginPageContainer/MainUserPageContainer";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={LoginPageContainer} />
          <Route path="/main" exact component={MainUserPageContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
