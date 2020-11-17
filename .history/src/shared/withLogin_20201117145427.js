import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { loginFieldsValidate } from "../validation/login";
import CircularProgress from "@material-ui/core/CircularProgress";
// eslint-disable-next-line import/no-anonymous-default-export
export default (Cmp) => {
  return (props) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const logIn = ({ username, password }) => {
      setLoading(true);
      debugger;
      setErrors(loginFieldsValidate(username, password));
      if (errors.length === 0) {
        dispatch(login(username, password));
      }
    };
    if (loading) {
      return <CircularProgress />;
    }

    return <Cmp {...props} tryLogin={logIn} errors={errors} />;
  };
};
