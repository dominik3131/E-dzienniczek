import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import background from "../../assets/background.jpg";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          background: `url(${background}) fixed center `,
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
      <div>Działa</div>
    </MuiThemeProvider>
  );
};

export default LoginPageContainer;
