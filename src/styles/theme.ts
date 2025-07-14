import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red, orange } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#336C58",            // Deep Green
    },
    secondary: {
      main: "#1976d2",            // French Blue
    },
    error: {
      main: red.A400,
    },
    warning: {
      main: orange[400],
    },
    background: {
      default: "#ECF2F1"          // Anti-Flash White
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export const Event_Legend = {
  'High Impact': '#FF4C4C',         // Red
  'New/Changes': '#F39C12',         // Amber
  'Existing': '#929292',            // Battleship Grey
  // 'Existing': '#90A9B7',            // Cadet Grey
  'Draft': '#D2D8B3',               // Beige
}

export default theme;