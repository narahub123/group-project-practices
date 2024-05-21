import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import "./userlayout.css";

const UserLayout = () => {
  return (
    <div className="userPage">
      <UserNavbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
