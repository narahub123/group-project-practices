import React from "react";
import "./process.css";
import { Link, useLocation } from "react-router-dom";

interface ProcessType {
  setContentTypeId: (value: string) => void;
}
const Process = ({ setContentTypeId }: ProcessType) => {
  const location = useLocation();
  const { hash } = location;

  return (
    <div className="process">
      <div className="logo">
        <Link to="/">
          <img src="" alt="로고" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link
              to="#link1"
              className={
                hash === "" || hash === "#link1" ? "link active" : "link"
              }
            >
              STEP1 <br /> 날짜 선택
            </Link>
          </li>
          <li>
            <Link
              to="#link2"
              className={hash === "#link2" ? "link active" : "link"}
            >
              STEP2 <br />
              장소 선택
            </Link>
          </li>
          <li>
            <Link
              to="#link3"
              className={hash === "#link3" ? "link active" : "link"}
            >
              STEP3 <br />
              숙소 선택
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Process;
