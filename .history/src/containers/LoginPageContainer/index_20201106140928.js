import React from "react";
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import {
  CssBaseline,
  Typography,
  Grid,
  Container,
  Paper,
  Box,
  Card,
  CardMedia,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import background from "../../assets/background.jpg";
import { loginPanel as backgroundPanelColor } from "../../styles/background";
import readingBook from "../../assets/reading-book.png";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          background: `url(${background}) fixed left `,
          backgroundSize: `100%`,
        },
      },
    },
  },
});

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: backgroundPanelColor,
    padding: "20% 0",
  },
  img: {
    width: "50%",
    maxWidth: 345,
    // maxHeight: 140,
  },
});

const LoginPageContainer = () => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container justify="flex-end">
        <Grid container item md={4} sm={6}>
          <Box className={classes.root}>
            <img className={classes.img} src={readingBook} alt="Logo" />
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
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                startAdornment={
                  <InputAdornment position="start">
                    <LockRoundedIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

export default LoginPageContainer;
