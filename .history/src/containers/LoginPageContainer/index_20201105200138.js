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
      default: "#303030",
    },
  },
});

const LoginPageContainer = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container justify="flex-end">
        <Grid container item sm={5}>
          <ThemeProvider theme={theme2}>
            <CssBaseline />

            <Box minHeight="100vh" bgcolor="white">
              <Grid item sm={12}>
                <Paper>Cos tam</Paper>
              </Grid>
            </Box>
          </ThemeProvider>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPageContainer;
