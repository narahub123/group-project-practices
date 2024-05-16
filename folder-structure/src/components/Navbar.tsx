import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <NavLink to="/">home</NavLink>
        <NavLink to="/community">community</NavLink>
        <NavLink to="/mypage">mypage</NavLink>
        <NavLink to="/admin">admin</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
