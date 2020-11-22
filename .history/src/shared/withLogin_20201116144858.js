import { React, Component } from "react";
import axios from "axios";
// eslint-disable-next-line import/no-anonymous-default-export
export default (Cmp) => {
  return class extends Component {
    state = {
      loading: false,
    };
    logIn = (login, password) => {
      axios
        .post("https://e-dzienniczek.herokuapp.com/api/login", {
          username: JSON.stringify(login),
          password: JSON.stringify(password),
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
