import React from "react";
import { MonthlyDates } from "../../../../utils/kakaoMap/time";
import "./calendar.css";
interface CalendarProps {
  month: Date;
}

const weekOfDay: string[] = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = ({ month }: CalendarProps) => {
  const dates = MonthlyDates(month);

  return (
    <div className="calendar">
      <table className="calendarTB">
        <thead>
          <tr>
            {weekOfDay.map((day, index) =>
              index === 0 ? (
                <th className="sun" key={index}>
                  {day}
                </th>
              ) : index === 6 ? (
                <th className="sat" key={index}>
                  {day}
                </th>
              ) : (
                <th className="day" key={index}>
                  {day}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {dates.map(
            (date, index) =>
              index % 7 === 0 && (
                <tr key={index + 1}>
                  {dates.map((date, i) =>
                    index <= i && i < index + 7 && i % 7 === 0 ? (
                      <td
                        key={i}
                        className={i < date ? "date lastmonth sun" : "date sun"}
                      >
                        {date}
                      </td>
                    ) : index <= i && i < index + 7 && i % 7 === 6 ? (
                      <td
                        key={i}
                        className={i < date ? "date lastmonth sat" : "date sat"}
                      >
                        {date}
                      </td>
                    ) : (
                      index <= i &&
                      i < index + 7 && (
                        <td
                          key={i}
                          className={i < date ? "date lastmonth" : "date"}
                        >
                          {date}
                        </td>
                      )
                    )
                  )}
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
