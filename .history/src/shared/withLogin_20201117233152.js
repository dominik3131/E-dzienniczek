import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { loginFieldsValidate } from "../validation/login";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

// eslint-disable-next-line import/no-anonymous-default-export
export default (Cmp) => {
  return (props) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
      email: [],
      password: [],
    });
    const history = useHistory();
    const dispatch = useDispatch();

    if (loading) {
      return <CircularProgress />;
    }
    const logIn = ({ username, password }) => {
      setLoading(true);
      setErrors(loginFieldsValidate(username, password));
      if ((errors.email.length & errors.password.length) === 0) {
        debugger;
        dispatch(login(username, password)).then(() => history.push("/main"));
      }
      setLoading(false);
    };

    const showErrors = (field) => {
      return (
        errors[field].map((err) => (
          <span>
            {err}
            <br />
          </span>
        )) || null
      );
    };

    return (
      <Cmp
        {...props}
        tryLogin={logIn}
        errors={errors}
        showErrors={showErrors}
      />
    );
  };
};
