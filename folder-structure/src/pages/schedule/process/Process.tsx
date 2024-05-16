import React from "react";
import "./process.css";
import { Link, useLocation } from "react-router-dom";

const Process = () => {
  const location = useLocation();
  const { hash } = location;

  return (
    <>
      <Link to="/">
        <img src="" alt="로고" />
      </Link>
      <nav className="process">
        <Link
          to="#link1"
          className={hash === "" || hash === "#link1" ? "link active" : "link"}
        >
          STEP1 날짜 정하기
        </Link>
        <Link
          to="#link2"
          className={hash === "#link2" ? "link active" : "link"}
        >
          STEP2 장소 정하기
        </Link>
        <Link
          to="#link3"
          className={hash === "#link3" ? "link active" : "link"}
        >
          STEP3 숙소 정하기
        </Link>
      </nav>
    </>
  );
};

export default Process;
