import React, { Dispatch, SetStateAction, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { metros } from "../../../data/metro";
import "./choice.css";

import Dates from "./dates/Dates";
import Places from "./places/Places";
import Plan from "./plan/Plan";
import { PlaceApiDetailType } from "./places/PlaceModal";

interface ScheduleDetailType {
  schedule_order?: number;
  start_time?: Date;
  end_time?: Date;
  content_id?: string;
  content_type_id?: string;
}

export interface ScheduleType {
  metro_id?: string;
  start_date?: Date;
  end_date?: Date;
  schedule_name?: string;
  schedule_detail?: ScheduleDetailType[] | undefined;
}

export interface ScheduleProps extends ScheduleType {
  schedule: ScheduleType;
  setSchedule: Dispatch<SetStateAction<ScheduleType>>;
}

export interface ChoiceProps {
  contentTypeId: string;
  setActive: (value: boolean) => void;
  setContentId: (value: string) => void;
  setContentTypeId: (value: string) => void;
  selectedPlaces: string[];
  setSelectedPlaces: (value: string[]) => void;
}

const Choice = ({
  contentTypeId,
  setActive,
  setContentId,
  setContentTypeId,
  selectedPlaces,
  setSelectedPlaces,
}: ChoiceProps) => {
  const [schedule, setSchedule] = useState<ScheduleType>({});
  const [places, setPlaces] = useState<PlaceApiDetailType[]>([]);
  const location = useLocation();
  const { hash } = location;

  console.log(schedule);

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
          contentTypeId={contentTypeId}
          setSchedule={setSchedule}
          schedule={schedule}
          setActive={setActive}
          setContentId={setContentId}
          setContentTypeId={setContentTypeId}
          selectedPlaces={selectedPlaces}
          setSelectedPlaces={setSelectedPlaces}
          places={places}
          setPlaces={setPlaces}
        />
      )}
      {hash === "#link4" && (
        <Plan
          setSchedule={setSchedule}
          schedule={schedule}
          places={places}
          setPlaces={setPlaces}
        />
      )}
    </div>
  );
};

export default Choice;
