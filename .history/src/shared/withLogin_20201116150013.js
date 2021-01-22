import { React, Component } from "react";
import axios from "axios";
// eslint-disable-next-line import/no-anonymous-default-export
export default (Cmp) => {
  return class extends Component {
    state = {
      loading: false,
    };
    logIn = (username, password) => {
      axios
        .post("/api/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    render() {
      return <Cmp {...this.props} tryLogin={this.logIn} />;
    }
  };
};
