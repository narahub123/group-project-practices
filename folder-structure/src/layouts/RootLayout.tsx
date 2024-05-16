import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import "./rootLayout.css";

const RootLayout = () => {
  return (
    <div className="root">
      <Navbar />
      <div className="part">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
