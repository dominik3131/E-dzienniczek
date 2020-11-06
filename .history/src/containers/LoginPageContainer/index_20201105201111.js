import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
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

const theme2 = createMuiTheme({
  palette: {
    background: {
      paper: "#b3b3b3",
      default: "#ff0000",
    },
  },
});

const LoginPageContainer = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container justify="flex-end">
        <MuiThemeProvider theme={theme2}>
          <CssBaseline />
          <Grid container item sm={5}>
            <Box minHeight="100vh">
              <Grid item sm={12}>
                <Paper>Cos tam</Paper>
              </Grid>
            </Box>
          </Grid>
        </MuiThemeProvider>
      </Grid>
    </MuiThemeProvider>
  );
};

export default LoginPageContainer;
