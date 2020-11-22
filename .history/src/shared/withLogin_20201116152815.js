import { React, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
// eslint-disable-next-line import/no-anonymous-default-export
export default (Cmp) => {
  return (props) => {
    const [loading, setLoading] = useState(false);

    logIn = ({ username, password }) => {
      setLoading(true);
      axios
        .post("https://e-dzienniczek.herokuapp.com/api/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          setLoading(false);
          console.log(res);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
    if (loading) {
      return <CircularProgress />;
    }

    return <Cmp {...props} tryLogin={this.logIn} />;
  };
};
