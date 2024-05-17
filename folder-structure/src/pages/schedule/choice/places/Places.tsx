import React from "react";
import PlacesList from "./PlacesList";
import SelectedPlacesList from "./SelectedPlacesList";
import "./places.css";
import { ScheduleProps } from "../Choice";

const Places = ({ schedule, setSchedule }: ScheduleProps) => {
  return (
    <div className="places">
      <PlacesList setSchedule={setSchedule} schedule={schedule} />
      <SelectedPlacesList setSchedule={setSchedule} schedule={schedule} />
    </div>
  );
};

export default Places;
