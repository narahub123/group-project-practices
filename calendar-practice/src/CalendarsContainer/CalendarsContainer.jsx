import React, { useEffect, useState } from "react";
import "./calendarsContainer.css";
import Calendar from "./Calendar/Calendar";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Calendars from "./Calendars/Calendars";

const CalendarsContainer = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [date, setDate] = useState(new Date());
  const [dates, setDates] = useState([
    new Date(new Date().setHours(0, 0, 0, 0)),
    new Date(
      new Date(new Date().setMonth(new Date().getMonth() + 1)).setHours(
        0,
        0,
        0,
        0
      )
    ),
  ]);

  console.log(start, end);
  const year = dates[0].getFullYear();
  const month = dates[0].getMonth() + 1;

  const yearNext = dates[1].getFullYear();
  const monthNext = dates[1].getMonth() + 1;

  const handleBefore = () => {
    const newDate = new Date(date);
    const monthBefore = new Date(newDate.setMonth(newDate.getMonth() - 1));
    setDate(new Date(monthBefore));
    setDates([
      new Date(monthBefore),
      new Date(monthBefore.setMonth(monthBefore.getMonth() + 1)),
    ]);
  };

  const handleAfter = () => {
    const newDate = new Date(date);
    const monthAter = new Date(newDate.setMonth(newDate.getMonth() + 1));
    setDate(new Date(monthAter));
    setDates([
      new Date(monthAter),
      new Date(monthAter.setMonth(monthAter.getMonth() + 1)),
    ]);
  };

  console.log(selectedDates);

  return (
    <div className="calendarsContainer">
      <div className="container">
        <div className="months">
          <nav className="before" onClick={() => handleBefore()}>
            <LuChevronLeft />
          </nav>
          <span className="curMonth">{`${year}년 ${month}월`}</span>
          <span className="nextMonth">{`${yearNext}년 ${monthNext}월`}</span>
          <nav className="after" onClick={() => handleAfter()}>
            <LuChevronRight />
          </nav>
        </div>
        <Calendars
          dates={dates}
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
          setSelectedDates={setSelectedDates}
        />
      </div>
    </div>
  );
};

export default CalendarsContainer;
