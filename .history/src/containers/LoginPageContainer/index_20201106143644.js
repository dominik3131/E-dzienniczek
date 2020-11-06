import React from "react";
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import { CssBaseline, Grid, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import background from "../../assets/background.jpg";
import { loginPanel as backgroundPanelColor } from "../../styles/background";
import readingBook from "../../assets/reading-book.png";
import LoginForm from "../../components/LoginForm/LoginForm";

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
    justifyContent: "center",
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
  h2: {
    fontFamily: "Lobster, open-sans",
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
            <Typography variant="h2" className={classes.h2}>
              E-dzienniczek
            </Typography>
            <LoginForm />
          </Box>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

export default LoginPageContainer;
