import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField,
} from "@material-ui/core";
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

const LoginForm = (props) => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="username"
        name="username"
        helperText="error"
        error={data.username.length === 0 ? "podany email nie istnieje" : null}
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
        error={data.username.length === 0 ? "podany email nie istnieje" : null}
        helperText="error"
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
        onClick={() => props.tryLogin({ ...data })}
      >
        Zaloguj się
      </Button>
    </form>
  );
};

export default LoginForm;
