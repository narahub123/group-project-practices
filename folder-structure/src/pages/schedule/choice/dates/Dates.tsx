import React, { useState } from "react";
import Calendar from "./Calendar";
import "./dates.css";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { ScheduleProps } from "../Choice";
import {
  DestrucDate,
  MonthBefore,
  MonthCurrent,
  MonthLater,
  dateMidFormatter,
} from "../../../../utils/kakaoMap/time";

const Dates = ({ schedule, setSchedule }: ScheduleProps) => {
  const [today, setToday] = useState<Date>(dateMidFormatter(new Date()));
  const [start, setStart] = useState<Date | undefined>(undefined);
  const [end, setEnd] = useState<Date | undefined>(undefined);

  console.log(start);
  console.log(end);

  const startDay = new Date(today);

  const curMonth = MonthCurrent(startDay);
  const nextMonth = MonthLater(startDay);

  const handleMonthBefore = () => {
    setToday(MonthBefore(today));
  };
  const handleMonthAfter = () => {
    setToday(MonthLater(today));
  };

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
          <span className="curMonth">
            <nav className="before" onClick={handleMonthBefore}>
              <LuChevronLeft />
            </nav>
            <p>
              {`${DestrucDate(curMonth).year}년 ${
                DestrucDate(curMonth).month + 1
              }월`}
            </p>
          </span>
          <span className="nextMonth">
            <p>
              {`${DestrucDate(nextMonth).year}년 ${
                DestrucDate(nextMonth).month + 1
              }월`}
            </p>
            <nav className="after" onClick={handleMonthAfter}>
              <LuChevronRight />
            </nav>
          </span>
        </div>
        <div className="calendars">
          <Calendar
            month={curMonth}
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
            setSchedule={setSchedule}
          />
          <Calendar
            month={nextMonth}
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
            setSchedule={setSchedule}
          />
        </div>
      </div>
    </div>
  );
};

export default Dates;
