import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <div>Działa</div>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
