import React, { Dispatch, SetStateAction } from "react";
import "./plan.css";
import { ScheduleType } from "../Choice";
import { PlaceApiDetailType } from "../places/PlaceModal";
import DropCard from "./DragCard";
import { LuTrash2 } from "react-icons/lu";
import {
  CalculateDuration,
  dateFormatter,
} from "../../../../utils/kakaoMap/time";
import DropIndicator from "./DropIndicator";

interface PlanType {
  schedule: ScheduleType;
  setSchedule: Dispatch<SetStateAction<ScheduleType>>;
  places: PlaceApiDetailType[];
  setPlaces: (value: PlaceApiDetailType[]) => void;
  selectedPlaces: string[];
  setSelectedPlaces: (value: string[]) => void;
}

const Plan = ({
  setSchedule,
  schedule,
  places,
  setPlaces,
  selectedPlaces,
  setSelectedPlaces,
}: PlanType) => {
  const dates = CalculateDuration(schedule.start_date, schedule.end_date);

  // console.log(dates);

  return (
    <div className="planDetail">
      <div className="planDetailList">
        <div className="title">
          <p>Selected List</p>
        </div>
        <div className="list">
          <ul>
            <DropIndicator />
            {places?.map((place) => (
              <>
                <DropCard
                  place={place}
                  schedule={schedule}
                  setSchedule={setSchedule}
                  places={places}
                  setPlaces={setPlaces}
                  selectedPlaces={selectedPlaces}
                  setSelectedPlaces={setSelectedPlaces}
                  key={place.contentid}
                />
              </>
            ))}
          </ul>
        </div>
      </div>
      <div className="kanban">
        <header>
          <p className="title">Detail Plan</p>
          <p className="duration">
            {schedule.start_date && schedule.end_date
              ? `기간 ${dateFormatter(schedule.start_date)}~${dateFormatter(
                  schedule.end_date
                )}`
              : "dates have not yet to be set"}
          </p>
        </header>
        <div className="columns">
          <ul>
            {dates.map((date, index) => (
              <li className="column" key={index}>
                <div className="dateContainer">
                  <p className="date">{dateFormatter(date)}</p>
                </div>
                <DropIndicator />
                <div className="columnList"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Plan;
