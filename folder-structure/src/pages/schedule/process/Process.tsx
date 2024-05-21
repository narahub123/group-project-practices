import React, { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import "./process.css";
import { Link, useLocation } from "react-router-dom";
import { ScheduleDetailType, ScheduleType } from "../choice/Choice";
import Button from "../../../components/ui/Button";
import axios from "axios";

interface ProcessType {
  schedule: ScheduleType;
  setSchedule: Dispatch<SetStateAction<ScheduleType>>;
  scheduleDetail: ScheduleDetailType[];
}
const Process = ({ schedule, setSchedule, scheduleDetail }: ProcessType) => {
  const location = useLocation();
  const { hash } = location;

  useEffect(() => {
    setSchedule({
      ...schedule,
      schedule_detail: scheduleDetail,
    });
  }, [scheduleDetail]);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    values: ScheduleType
  ) => {
    e.preventDefault();
    console.log(values);

    axios
      .post(`http://localhost:8080/schedules`, values)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <div className="process">
      <div className="logo">
        <Link to="/">
          <img src="" alt="로고" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link
              to="#link1"
              className={
                hash === "" || hash === "#link1" ? "link active" : "link"
              }
            >
              STEP1 <br /> 날짜 선택
            </Link>
          </li>
          <li>
            <Link
              to="#link2"
              className={hash === "#link2" ? "link active" : "link"}
            >
              STEP2 <br />
              장소 선택
            </Link>
          </li>
          <li>
            <Link
              to="#link3"
              className={hash === "#link3" ? "link active" : "link"}
            >
              STEP3 <br />
              숙소 선택
            </Link>
          </li>
          <li>
            <Link
              to="#link4"
              className={hash === "#link4" ? "link active" : "link"}
            >
              STEP4 <br />
              일정 확정
            </Link>
          </li>
          <li>
            <form onSubmit={(e) => handleSubmit(e, schedule)}>
              <Button text="일정 등록하기" />
            </form>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Process;
