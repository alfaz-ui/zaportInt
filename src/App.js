// src/App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { SnackbarProvider } from "notistack";
import DeviceCheck from "./utils/DeviceCheck";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <DeviceCheck>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </DeviceCheck>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
