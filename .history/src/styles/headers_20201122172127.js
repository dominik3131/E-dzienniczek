import { createMuiTheme } from "@material-ui/core/styles";
import { FullscreenExit } from "@material-ui/icons";

export const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
        h6: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
    },
    },
  },
});
