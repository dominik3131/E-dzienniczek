import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  CssBaseline,
  Typography,
  Grid,
  Container,
  Paper,
  Box,
} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import background from "../../assets/background.jpg";
import { blue } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
  },
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

const LoginPageContainer = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container justify="flex-end">
        <ThemeProvider>
          {" "}
          <Grid container item sm={5}>
            <Box minHeight="100vh" bgcolor="white">
              <Grid item sm={12}>
                <Paper>Cos tam</Paper>
              </Grid>
            </Box>
          </Grid>
        </ThemeProvider>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPageContainer;
