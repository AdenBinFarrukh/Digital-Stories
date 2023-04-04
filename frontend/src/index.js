import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthContextProvider } from "./context/authContext";
import { ChangeContextProvider } from "./context/changeContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <ChangeContextProvider>
          <App />
        </ChangeContextProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
