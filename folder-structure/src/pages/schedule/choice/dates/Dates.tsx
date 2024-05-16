import React from "react";
import Calendar from "./Calendar";

const Dates = () => {
  return (
    <div className="dates">
      <div className="months">
        <nav className="before">이전</nav>
        <span className="curMonth">이번달</span>
        <span className="nextMonth">다음달</span>
        <nav className="after">이후</nav>
      </div>
      <div className="calendars">
        <Calendar />
        <Calendar />
      </div>
    </div>
  );
};

export default Dates;
