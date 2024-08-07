import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@progress/kendo-ui";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://kendo.cdn.telerik.com/themes/8.0.1/default/default-main.css"
    />
    <App />
  </React.StrictMode>
);
