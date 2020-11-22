import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          background: `url(${background}) no-repeat fixed left `,
          backgroundSize: `100%`,
        },
      },
    },
  },
});
