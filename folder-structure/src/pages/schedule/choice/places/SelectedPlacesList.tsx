import React from "react";
import "./selectedPlacesList.css";
import PlaceCard from "./PlaceCard";
import { LuTrash2 } from "react-icons/lu";
import { ScheduleProps } from "../Choice";

const SelectedPlacesList = ({ setSchedule }: ScheduleProps) => {
  return (
    <div className="selectedPlacesList">
      <div className="info">
        <span className="count">1</span>
        <span className="reset">장소 설정 초기화</span>
      </div>
      <div className="selectedList">
        <ul>
          {
            <li>
              <span className="index">
                <p>1</p>
              </span>
              <span className="selectedPlaceInfo">{/* <PlaceCard /> */}</span>
              <span className="trash">
                <LuTrash2 />
              </span>
            </li>
          }
        </ul>
      </div>
    </div>
  );
};

export default SelectedPlacesList;
