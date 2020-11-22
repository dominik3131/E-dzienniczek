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

    if (loading) {
      return <CircularProgress />;
    }
    const logIn = ({ username, password }) => {
      setLoading(true);
      setErrors(loginFieldsValidate(username, password));
      if (errors.length === 0) {
        debugger;
        dispatch(login(username, password));
      }
      setLoading(false);
    };

    return <Cmp {...props} tryLogin={logIn} errors={errors} />;
  };
};
