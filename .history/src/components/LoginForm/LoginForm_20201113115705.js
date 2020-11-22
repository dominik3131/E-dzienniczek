import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
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

const LoginForm = () => {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl>
        <InputLabel htmlFor="login">Login</InputLabel>
        <Input
          id="login"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Hasło</InputLabel>
        <Input
          id="password"
          startAdornment={
            <InputAdornment position="start">
              <LockRoundedIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <Button variant="contained" color="primary" className={classes.margin}>
        Zaloguj się
      </Button>
    </form>
  );
};

export default LoginForm;
