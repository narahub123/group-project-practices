import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  DestrucDate,
  MonthBefore,
  MonthCurrent,
  MonthlyDates,
  TenDaysLater,
} from "../../../../utils/kakaoMap/time";
import "./calendar.css";
import { ScheduleType } from "../Choice";

import { weekOfDay } from "../../../../utils/kakaoMap/time";

interface CalendarProps {
  month: Date;
  start: Date | undefined;
  setStart: Dispatch<SetStateAction<Date | undefined>>;
  end: Date | undefined;
  setEnd: Dispatch<SetStateAction<Date | undefined>>;
  setSchedule: Dispatch<SetStateAction<ScheduleType>>;
}

const Calendar = ({
  month,
  start,
  setStart,
  end,
  setEnd,
  setSchedule,
}: CalendarProps) => {
  const dateRefs = useRef<(HTMLTableDataCellElement | null)[]>([]);

  const dates = MonthlyDates(month);

  const receivedMonth = new Date(month);

  const curMonth = DestrucDate(MonthCurrent(receivedMonth));
  const exMonth = DestrucDate(MonthBefore(receivedMonth));

  const curDate = (date: number) =>
    new Date(curMonth.year, curMonth.month, date);

  const exDate = (date: number) => new Date(exMonth.year, exMonth.month, date);

  const handleSelection = (i: number) => {
    if (i >= 0 && i < dateRefs.current.length) {
      // 인덱스 유효성 검사
      const id = dateRefs.current[i]?.id;
      const className = dateRefs.current[i]?.className;

      if (id) {
        // id가 존재하는지 확인
        const selectedDate = new Date(id);
        if (!isNaN(selectedDate.getTime())) {
          // 날짜 유효성 검사
          // console.log("selected date:", selectedDate);
          if (className?.includes("possible")) {
            setEnd(selectedDate);
            setSchedule({ start_date: start, end_date: selectedDate });
          } else {
            setStart(selectedDate);
            setEnd(undefined);
          }
        } else {
          console.error("wrong date format");
        }
      } else {
        console.error("id doesn't exist");
      }
    } else {
      console.error("wrong index");
    }
  };

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
                        id={i < date ? `${exDate(date)}` : `${curDate(date)}`}
                        className={
                          i < date
                            ? "date sun lastmonth"
                            : start?.getTime() === curDate(date).getTime() ||
                              (start &&
                                end &&
                                start <= curDate(date) &&
                                curDate(date) <= end)
                            ? "date sun active"
                            : start &&
                              !end &&
                              start < curDate(date) &&
                              curDate(date) < TenDaysLater(start)
                            ? "date sun possible"
                            : "date sun none"
                        }
                        onClick={() => handleSelection(i)}
                        ref={(el) => (dateRefs.current[i] = el)}
                      >
                        {date}
                      </td>
                    ) : index <= i && i < index + 7 && i % 7 === 6 ? (
                      <td
                        key={i}
                        id={i < date ? `${exDate(date)}` : `${curDate(date)}`}
                        className={
                          i < date
                            ? "date sat lastmonth"
                            : start?.getTime() === curDate(date).getTime() ||
                              (start &&
                                end &&
                                start <= curDate(date) &&
                                curDate(date) <= end)
                            ? "date sat active"
                            : start &&
                              !end &&
                              start < curDate(date) &&
                              curDate(date) < TenDaysLater(start)
                            ? "date sat possible"
                            : "date sat none"
                        }
                        onClick={() => handleSelection(i)}
                        ref={(el) => (dateRefs.current[i] = el)}
                      >
                        {date}
                      </td>
                    ) : (
                      index <= i &&
                      i < index + 7 && (
                        <td
                          key={i}
                          id={i < date ? `${exDate(date)}` : `${curDate(date)}`}
                          className={
                            i < date
                              ? "date lastmonth"
                              : start?.getTime() === curDate(date).getTime() ||
                                (start &&
                                  end &&
                                  start <= curDate(date) &&
                                  curDate(date) <= end)
                              ? "date active"
                              : start &&
                                !end &&
                                start < curDate(date) &&
                                curDate(date) < TenDaysLater(start)
                              ? "date possible"
                              : "date none"
                          }
                          onClick={() => handleSelection(i)}
                          ref={(el) => (dateRefs.current[i] = el)}
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
