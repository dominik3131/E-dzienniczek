import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h6: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  },
});
