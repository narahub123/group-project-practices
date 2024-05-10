import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CalendarsContainer from "./CalendarsContainer/CalendarsContainer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CalendarsContainer />
  </React.StrictMode>
);
