import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import background from "../../assets/background.jpg";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: `url(${background})`,
        },
      },
    },
  },
});

const LoginPageContainer = () => {
  return <div>Działa</div>;
};

export default LoginPageContainer;
