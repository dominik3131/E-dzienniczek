import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
    // const apiErrorsMessage = useSelector(store => store.)

    if (loading) {
      return <CircularProgress />;
    }
    const logIn = ({ username, password }) => {
      setLoading(true);
      const newErrors = loginFieldsValidate(username, password);
      setErrors(newErrors);
      if (newErrors.email.length === 0 && newErrors.password.length === 0) {
        dispatch(login(username, password)).then(() => history.push("/main"));
        // if()
      }
      setLoading(false);
    };

    const showErrors = (field) => {
      return (
        errors[field].map((err) => (
          <span key={err}>
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
        apiErrors
        validateErrors={errors}
        showErrors={showErrors}
      />
    );
  };
};
