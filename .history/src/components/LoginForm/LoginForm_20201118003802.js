import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import { Button, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& .MuiFormControl-root": {
      margin: theme.spacing(2),
      width: "30ch",
    },
  },
  margin: {
    margin: theme.spacing(4),
  },
}));

const LoginForm = ({ validateErrors, tryLogin, showErrors }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const apiErrorsMessage = useSelector((store) => store.message);
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Alert variant="filled" severity="error">
        {apiErrorsMessage || null}
      </Alert>
      <TextField
        id="username"
        name="username"
        helperText={showErrors("email")}
        error={validateErrors.email.length > 0 || null}
        label="Username"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        onChange={handleChange}
      />
      <TextField
        id="password"
        name="password"
        label="password"
        error={validateErrors.password.length > 0 || null}
        helperText={showErrors("password")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockRoundedIcon />
            </InputAdornment>
          ),
        }}
        type="password"
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.margin}
        onClick={() => tryLogin({ ...data })}
      >
        Zaloguj się
      </Button>
    </form>
  );
};

export default LoginForm;
