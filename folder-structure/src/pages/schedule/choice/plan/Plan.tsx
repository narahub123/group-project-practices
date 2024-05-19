import React, { Dispatch, SetStateAction } from "react";
import "./plan.css";
import { ScheduleType } from "../Choice";
import { PlaceApiDetailType } from "../places/PlaceModal";
import DropCard from "./DropCard";
import { LuTrash2 } from "react-icons/lu";

interface PlanType {
  schedule: ScheduleType;
  setSchedule: Dispatch<SetStateAction<ScheduleType>>;
  places: PlaceApiDetailType[];
  setPlaces: (value: PlaceApiDetailType[]) => void;
}

const Plan = ({ setSchedule, schedule, places, setPlaces }: PlanType) => {
  console.log(schedule.schedule_detail);

  return (
    <div className="planDetail">
      <div className="planDetailList">
        <div className="title">
          <p>Selected List</p>
        </div>
        <div className="list">
          <ul>
            {places?.map((place) => (
              <li key={place.contentid}>
                <div>
                  <DropCard place={place} />
                  <span
                    className="trash"
                    //   onClick={() => handleDelete(place.contentid)}
                  >
                    <LuTrash2 />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="kanban">
        <div className="columns">
          <div className="column">column</div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
