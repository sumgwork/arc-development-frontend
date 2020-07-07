import { createMuiTheme } from "@material-ui/core/styles";

const ARC_BLUE = "#0B72B9";
const ARC_ORANGE = "#FFBA60";

export default createMuiTheme({
  palette: {
    common: {
      arcBlue: ARC_BLUE,
      arcOrange: ARC_ORANGE,
    },
    primary: {
      main: ARC_BLUE,
    },
    secondary: {
      main: ARC_ORANGE,
    },
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1.1rem",
      textTransform: "none",
      color: "white",
    },
  },
});
