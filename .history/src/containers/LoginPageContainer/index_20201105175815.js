import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline, Typography, Grid } from "@material-ui/core";
import background from "../../assets/background.jpg";

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

const LoginPageContainer = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Grid>
        <Grid item sm={6}>
          <Paper>xs=6</Paper>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

export default LoginPageContainer;
