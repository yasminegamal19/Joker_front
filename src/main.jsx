import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AppConfigProvider } from "./context/AppConfigContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AppConfigProvider>
          <App />
        </AppConfigProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
