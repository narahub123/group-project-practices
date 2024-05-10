import React from "react";
import "./calendarsContainer.css";
import Calendar from "./Calendar/Calendar";

const CalendarsContainer = () => {
  return (
    <div className="calendarsContainer">
      <div className="months">
        <span className="before">before</span>
        <span className="curMonth">curMonth</span>
        <span className="nextMonth">nextMonth</span>
        <span className="after">after</span>
      </div>
      <div className="calendars"></div>
    </div>
  );
};

export default CalendarsContainer;
