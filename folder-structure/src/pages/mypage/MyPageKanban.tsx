import React, { useEffect, useState } from "react";
import axios from "axios";
import "./mypagekanban.css";
import { useParams } from "react-router-dom";

import { CalculateDuration, dateFormatter } from "../../utils/kakaoMap/time";
import { ScheduleDetailType, ScheduleType } from "../../types/schedules";

interface ColumnPlaces {
  [key: string]: ScheduleDetailType[];
}

const MyPageKanban = () => {
  const [schedule, setSchedule] = useState<ScheduleType>();

  const params = useParams();

  const start_date = schedule?.start_date ?? new Date();

  const end_date = schedule?.end_date ?? new Date();

  const dates =
    schedule && CalculateDuration(new Date(start_date), new Date(end_date));
  console.log(params.scheduleId);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/schedules/${params.scheduleId}`)
      .then((response) => {
        setSchedule(response.data);
      })
      .catch((error) => console.log(error.response.data));
  }, [params.scheduleId]);

  console.log(schedule?.schedule_detail);

  return (
    <div className="myPageKanban">
      <header>
        <div className="title">
          <input
            type="text"
            placeholder="이번 여행의 이름을 정해주세요"
            defaultValue={schedule?.schedule_name}
            //   onChange={(e) => handleTitle(e)}
          />
        </div>
        <p className="duration">
          {schedule?.start_date && schedule?.end_date
            ? `기간 ${dateFormatter(
                new Date(schedule?.start_date)
              )}~${dateFormatter(new Date(schedule?.end_date))}`
            : "dates have not yet to be set"}
        </p>
      </header>
      <div className="columns">
        <ul>
          {dates?.map((date, column) => (
            <li className="column" key={column}>
              <div className="dateContainer">
                <p className="date">{dateFormatter(date)}</p>
              </div>

              <div className="columnList">
                {schedule?.schedule_detail
                  ?.filter(
                    (detail) =>
                      detail.schedule_order?.toString() === column.toString()
                  )
                  .map((c) => (
                    <ul>
                      <li>
                        <p>{c.content_id}</p>
                      </li>
                    </ul>
                  ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyPageKanban;
