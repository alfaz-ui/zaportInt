import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import "./App.css";

function App() {
  const [warning, setWarning] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an async authentication check
    setTimeout(() => {
      const login = localStorage.getItem("login");
      // Replace this with your actual authentication logic
      const authStatus = login; // Change this to true or false based on your auth logic
      setIsAuthenticated(authStatus);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <BrowserRouter>
        <AppRoutes isAuthenticated={isAuthenticated} isLoading={isLoading} />
        {/* <PreventTabSwitch /> */}
        {/* <DrawerComponent /> */}
        {/* <Snackbar
          open={warning}
          autoHideDuration={6000}
          onClose={() => setWarning(false)}
          message="Avoid switching tabs !!!!"
          // action={action}
        /> */}

        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <VideoRecorder />
        </div> */}
      </BrowserRouter>
    </>
  );
}

export default App;
