import React from "react";
import Calendar from "./Calendar";
import "./dates.css";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const Dates = () => {
  return (
    <div className="dates">
      <div className="explanation">
        <p style={{ fontSize: "24px" }}>
          <b>여행 기간이 어떻게 되시나요?</b>
        </p>
        <p
          style={{
            textDecoration: "underline",
            fontSize: "14px",
            paddingTop: "5px",
          }}
        >
          여행일자는 <b>최대 10일</b>까지 설정 가능합니다
        </p>
        <p style={{ textDecoration: "underline", fontSize: "14px" }}>
          현재 여행 기간 <b>(여행지 도착 날짜, 여행지 출발 날짜)</b>으로
          입력해주세요
        </p>
      </div>
      <div className="container">
        <div className="months">
          <nav className="before">
            <LuChevronLeft />
          </nav>
          <span className="curMonth">이번달</span>
          <span className="nextMonth">다음달</span>
          <nav className="after">
            <LuChevronRight />
          </nav>
        </div>
        <div className="calendars">
          <Calendar />
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Dates;
