import React, { useState } from "react";
import "./calendar.css";

const Calendar = ({ date, start, setStart, end, setEnd }) => {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const getDate = (date) => {
    const newDate = new Date(year, month - 1, date);
    newDate.setHours(0, 0, 0, 0);

    return newDate;
  };

  const lastDayOfMonth = new Date(year, month, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
    const value = e.currentTarget.getAttribute("aria-label");
    console.log(new Date(year, month - 1, date));
    if (className === "date possible") {
      setEnd(getDate(date));
      return;
    }
    // const newDate = new Date(year, month - 1, date);
    setStart(getDate(date));
    setEnd("");
    // console.log(newDate);
  };

  console.log(start);
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
                            date <= i &&
                            new Date(start).getTime() ===
                              getDate(date).getTime()
                              ? "date active"
                              : date <= i &&
                                start < getDate(date) &&
                                end === "" &&
                                getDate(date) <
                                  new Date(
                                    new Date(start).setDate(
                                      new Date(start).getDate() + 10
                                    )
                                  )
                              ? "date possible"
                              : date <= i &&
                                start !== 0 &&
                                start < getDate(date) &&
                                getDate(date) <
                                  new Date(
                                    new Date(start).setDate(
                                      new Date(start).getDate() + 10
                                    )
                                  ) &&
                                end !== "" &&
                                getDate(date) <= end
                              ? "date active"
                              : firstDayOfMonth > i
                              ? "formerMonth"
                              : today.getTime() ===
                                new Date(year, month - 1, date, 0).getTime()
                              ? "date today"
                              : "date"
                          }
                          id={date}
                          aria-label={
                            firstDayOfMonth > date
                              ? new Date(year, month - 1, date, 0)
                              : new Date(year, month - 2, date, 0)
                          }
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
