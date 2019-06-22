import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Login from "./Login";
import darkTheme from "../themes/darkTheme";

const loginTheme = createMuiTheme(darkTheme);
export default () => (
  <MuiThemeProvider theme={loginTheme}>
    <Login />
  </MuiThemeProvider>
);
