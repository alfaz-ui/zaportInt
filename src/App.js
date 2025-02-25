// src/App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { SnackbarProvider } from "notistack";
import DeviceCheck from "./utils/DeviceCheck";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./themes/theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <DeviceCheck>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </DeviceCheck>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
