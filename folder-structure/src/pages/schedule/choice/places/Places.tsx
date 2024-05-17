import React, { useState } from "react";
import PlacesList from "./PlacesList";
import SelectedPlacesList from "./SelectedPlacesList";
import "./places.css";
import { ScheduleProps } from "../Choice";
import PlaceModal from "./PlaceModal";

export interface PlacesProps extends ScheduleProps {
  setActive: (value: boolean) => void;
  setContentId: (value: string) => void;
  setContentTypeId: (value: string) => void;
}

const Places = ({
  schedule,
  setSchedule,
  setActive,
  setContentId,
  setContentTypeId,
}: PlacesProps) => {
  return (
    <div className="places">
      <PlacesList
        setSchedule={setSchedule}
        setActive={setActive}
        setContentId={setContentId}
        setContentTypeId={setContentTypeId}
        schedule={schedule}
      />
      <SelectedPlacesList
        schedule={schedule}
        setSchedule={setSchedule}
        setActive={setActive}
        setContentId={setContentId}
        setContentTypeId={setContentTypeId}
      />
    </div>
  );
};

export default Places;
