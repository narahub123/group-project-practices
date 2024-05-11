import React, { useState } from "react";
import "./calendars.css";
import Calendar from "../Calendar/Calendar";

const Calendars = ({
  dates,
  setSelectedDates,
  start,
  setStart,
  end,
  setEnd,
}) => {
  

  return (
    <div className="calendars">
      <Calendar
        date={dates[0]}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        setSelectedDates={setSelectedDates}
      />
      <Calendar
        date={dates[1]}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        setSelectedDates={setSelectedDates}
      />
    </div>
  );
};

export default Calendars;
