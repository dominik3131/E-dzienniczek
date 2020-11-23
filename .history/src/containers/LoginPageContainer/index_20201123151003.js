import React from "react";
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import { CssBaseline, Grid, Box } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import background from "../../assets/background.jpg";
import { loginPanel as backgroundPanelColor } from "../../styles/background";
import readingBook from "../../assets/reading-book.png";
import LoginForm from "../../components/LoginForm/LoginForm";
import withLogin from "../../shared/withLogin";

const LoginFormWithHandleErrorAndLoading = withLogin(LoginForm);

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      // "@global": {
      body: {
        background: `url(${background}) no-repeat fixed left `,
        backgroundSize: `100%`,
      },
      // },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: backgroundPanelColor,
  },
  img: {
    [theme.breakpoints.down("sm")]: {
      width: "100px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "150px",
    },
  },
  h2: {
    fontFamily: "Lobster, open-sans",
    margin: "5% 0",
  },
}));

const LoginPageContainer = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container justify="flex-end">
        <Grid container item md={4} sm={6}>
          <Box className={classes.root}>
            <img className={classes.img} src={readingBook} alt="Logo" />
            <Typography variant={matches ? "h3" : "h4"} className={classes.h2}>
              E-dzienniczek
            </Typography>
            <LoginFormWithHandleErrorAndLoading />
          </Box>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

export default LoginPageContainer;
