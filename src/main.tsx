import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CountryProvider } from "./CountryContext.tsx";

const url = "http://universities.hipolabs.com/search";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <CountryProvider url={url}>
        <App />
      </CountryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
