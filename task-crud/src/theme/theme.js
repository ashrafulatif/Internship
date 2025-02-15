"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#312e2f",
    },
    secondary: {
      main: "#c6c2bf",
    },
    background: {
      default: "#f7f7f7",
    },
    text: {
      primary: "#312e2f",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
