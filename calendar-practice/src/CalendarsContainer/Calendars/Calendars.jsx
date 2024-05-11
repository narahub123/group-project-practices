import React, { useState } from "react";
import "./calendars.css";
import Calendar from "../Calendar/Calendar";

const Calendars = ({ dates }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <div className="calendars">
      <Calendar
        date={dates[0]}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
      />
      <Calendar
        date={dates[1]}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
      />
    </div>
  );
};

export default Calendars;
