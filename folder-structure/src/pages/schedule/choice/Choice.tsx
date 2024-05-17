import React, { Dispatch, SetStateAction, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { metros } from "../../../data/metro";
import "./choice.css";

import Dates from "./dates/Dates";
import Places from "./places/Places";

export interface ScheduleType {
  metro_id?: string;
  start_date?: Date;
  end_date?: Date;
  schedule_name?: string;
  schedule_detail?: {
    schedule_order?: number;
    start_time?: Date;
    end_time?: Date;
    content_id?: string;
    content_type_id?: string;
  };
}

export interface ScheduleProps extends ScheduleType {
  schedule: ScheduleType;
  setSchedule: Dispatch<SetStateAction<ScheduleType>>;
}

export interface ChoiceProps {
  setActive: (value: boolean) => void;
  setContentId: (value: string) => void;
  setContentTypeId: (value: string) => void;
}

const Choice = ({ setActive, setContentId, setContentTypeId }: ChoiceProps) => {
  const [schedule, setSchedule] = useState<ScheduleType>({});
  const location = useLocation();
  const { hash } = location;

  const pathname = useParams();

  const areacode = Object.entries(metros).find(
    (area) => area[1].name === pathname.metro
  );

  const areaCode = areacode?.[1]?.areaCode;

  schedule.metro_id = areaCode?.toString();

  return (
    <div className="choice">
      {(hash === "" || hash === "#link1") && (
        <Dates setSchedule={setSchedule} schedule={schedule} />
      )}
      {(hash === "#link2" || hash === "#link3") && (
        <Places
          setSchedule={setSchedule}
          schedule={schedule}
          setActive={setActive}
          setContentId={setContentId}
          setContentTypeId={setContentTypeId}
        />
      )}
    </div>
  );
};

export default Choice;
