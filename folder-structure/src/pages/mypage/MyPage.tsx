import React, { useEffect, useState } from "react";
import axios from "axios";
import "./myPage.css";
import { Link, Outlet } from "react-router-dom";
import { ScheduleDetailType, ScheduleType } from "../../types/schedules";

interface DBDetailType extends ScheduleDetailType {
  _id: string;
}

interface DBType {
  _id: string;
  __v: number;
  schedule_id?: string;
  metro_id?: string;
  start_date?: Date;
  end_date?: Date;
  schedule_name?: string;
  schedule_detail?: DBDetailType[] | undefined;
}

const MyPage = () => {
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/schedules`)
      .then((response) => {
        console.log(response.data);
        const rawSchedules = response.data;
        const allSchedules = rawSchedules.map((schedule: DBType) => ({
          schedule_id: schedule._id,
          metro_id: schedule.metro_id,
          schedule_name: schedule.schedule_name,
          start_date: schedule.start_date,
          end_date: schedule.end_date,
          schedule_detail: schedule.schedule_detail?.map((detail) => ({
            content_id: detail.content_id,
            createAt: detail.createdAt,
            schedule_order: detail.schedule_order,
            start_time: detail.start_time,
            end_time: detail.end_time,
          })),
        }));
        setSchedules(allSchedules);
      })
      .catch((error) => console.log(error.response.data));
  }, []);

  console.log(schedules);

  return (
    <div className="myPage">
      <ul>
        {schedules.map((schedule) => (
          <Link to={`/mypage/schedules/${schedule.schedule_id}`}>
            <li>
              <p>{schedule.schedule_name}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MyPage;
