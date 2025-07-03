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
      main: "#336C58",
    },
    secondary: {
      main: "#1976d2",
    },
    error: {
      main: red.A400,
    },
    warning: {
      main: orange[400],
    },
    background: {
      default: "#ECF2F1"
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export const Event_Legend = {
  'New/Change (>1m)': '#FF4C4C',    // Red
  'New/Change (>100k)': '#F39C12',  // Amber
  'New/Change (<100k)': '#7E57C2',  // Purple
  'Existing (>100k)': '#3572B0',    // Blue
  'Existing (<100k)': '#222222',    // Black
  'Draft': '#BDC3C7',               // Grey
}

export default theme;
