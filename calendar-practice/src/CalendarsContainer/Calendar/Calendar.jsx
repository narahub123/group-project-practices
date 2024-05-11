import React, { useState } from "react";
import "./calendar.css";

const Calendar = ({ date }) => {
  const [isActive, setIsActive] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const lastDayOfMonth = new Date(year, month, 0).getDate();

  const dates = [];

  const lastDayOfLastMonth = new Date(year, month - 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

  if (firstDayOfMonth !== 0) {
    for (let j = firstDayOfMonth - 1; j >= 0; j--) {
      const lastMonthDate = lastDayOfLastMonth - j;
      dates.push(lastMonthDate);
    }
  }

  for (let i = 1; i <= lastDayOfMonth; i++) {
    dates.push(i);
  }

  const handleClick = (e) => {
    const date = e.currentTarget.id;
    const className = e.currentTarget.className;
    console.log(className);
    if (className === "date possible") {
      setEnd(date);
      return;
    }
    const newDate = new Date(year, month - 1, date);
    setStart(date);
    setIsActive(true);
    setEnd("");
    console.log(newDate);
  };

  console.log(end);
  return (
    <table className="calender">
      <thead className="days">
        <tr key={month}>
          {daysOfWeek.map((day, index) => (
            <td key={index} className="day">
              {day}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {dates.map(
          (date, index) =>
            index % 7 === 0 && (
              <tr key={index + 1}>
                {dates.map(
                  (date, i) =>
                    index <= i &&
                    i < index + 7 && (
                      <td
                        key={i}
                        style={{
                          color:
                            i < firstDayOfMonth
                              ? "gray"
                              : i % 7 === 0
                              ? "red"
                              : "black",
                        }}
                      >
                        <div
                          key={i}
                          className={
                            date <= i && start === String(date) && isActive
                              ? "date active start"
                              : i > Number(start) &&
                                Number(start) !== 0 &&
                                Number(start) < date &&
                                end === "" &&
                                date < Number(start) + 10
                              ? "date possible"
                              : i > Number(start) &&
                                Number(start) !== 0 &&
                                Number(start) < date &&
                                date < Number(start) + 10 &&
                                end !== "" &&
                                date <= Number(end)
                              ? "date active end"
                              : firstDayOfMonth > i
                              ? "formerMonth"
                              : "date"
                          }
                          id={date}
                          onClick={
                            firstDayOfMonth <= i ? (e) => handleClick(e) : null
                          }
                        >
                          {date}
                        </div>
                      </td>
                    )
                )}
              </tr>
            )
        )}
      </tbody>
    </table>
  );
};

export default Calendar;
