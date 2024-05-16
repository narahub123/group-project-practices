import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <div>
          <span className="logo">
            <img src="" alt="로고" />
          </span>
          <span className="links">
            <ul>
              <li>
                <NavLink to="/">home</NavLink>
              </li>
              <li>
                <NavLink to="/community">community</NavLink>
              </li>
              <li>
                <NavLink to="/mypage">mypage</NavLink>
              </li>
              <li>
                <NavLink to="/admin">admin</NavLink>
              </li>
            </ul>
          </span>
        </div>
        <div className="userlog">
          <ul>
            <li>회원가입</li>
            <li>
              <button>로그인</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
