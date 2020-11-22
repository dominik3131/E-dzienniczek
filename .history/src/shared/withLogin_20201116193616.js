import { React, useState } from "react";
import { login } from "../actions/auth";
import CircularProgress from "@material-ui/core/CircularProgress";
// eslint-disable-next-line import/no-anonymous-default-export
export default (Cmp) => {
  return (props) => {
    const [loading, setLoading] = useState(false);

    const logIn = ({ username, password }) => {
      setLoading(true);
      // debugger;
      login(username, password);
    };
    if (loading) {
      return <CircularProgress />;
    }

    return <Cmp {...props} tryLogin={logIn} />;
  };
};
