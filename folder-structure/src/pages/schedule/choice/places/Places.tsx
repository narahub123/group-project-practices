import React, { useState } from "react";
import PlacesList from "./PlacesList";
import SelectedPlacesList from "./SelectedPlacesList";
import "./places.css";
import { ScheduleProps } from "../Choice";
import PlaceModal from "./PlaceModal";

export interface PlacesProps extends ScheduleProps {
  contentTypeId: string;
  setActive: (value: boolean) => void;
  setContentId: (value: string) => void;
  setContentTypeId: (value: string) => void;
  selectedPlaces: string[];
  setSelectedPlaces: (value: string[]) => void;
}

const Places = ({
  schedule,
  setSchedule,
  contentTypeId,
  setActive,
  setContentId,
  setContentTypeId,
  selectedPlaces,
  setSelectedPlaces,
}: PlacesProps) => {
  return (
    <div className="places">
      <PlacesList
        contentTypeId={contentTypeId}
        setSchedule={setSchedule}
        setActive={setActive}
        setContentId={setContentId}
        setContentTypeId={setContentTypeId}
        schedule={schedule}
        selectedPlaces={selectedPlaces}
        setSelectedPlaces={setSelectedPlaces}
      />
      <SelectedPlacesList
        contentTypeId={contentTypeId}
        schedule={schedule}
        setSchedule={setSchedule}
        setActive={setActive}
        setContentId={setContentId}
        setContentTypeId={setContentTypeId}
        selectedPlaces={selectedPlaces}
        setSelectedPlaces={setSelectedPlaces}
      />
    </div>
  );
};

export default Places;
