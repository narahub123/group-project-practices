import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="root">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
