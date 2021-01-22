import { React, Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
// eslint-disable-next-line import/no-anonymous-default-export
export default (Cmp) => {
  return class extends Component {
    state = {
      loading: false,
    };
    logIn = ({ username, password }) => {
      axios
        .post("/api/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          this.setState({ loading: true });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    render() {
      if (this.state.loading) {
        return <CircularProgress />;
      }

      return <Cmp {...this.props} tryLogin={this.logIn} />;
    }
  };
};
