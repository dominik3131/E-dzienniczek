import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPageContainer from "./containers/LoginPageContainer";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={LoginPageContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
