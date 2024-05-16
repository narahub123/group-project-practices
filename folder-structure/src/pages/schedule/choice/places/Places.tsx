import React from "react";
import PlacesList from "./PlacesList";
import SelectedPlacesList from "./SelectedPlacesList";
import "./places.css";

const Places = () => {
  return (
    <div className="places">
      <PlacesList />
      <SelectedPlacesList />
    </div>
  );
};

export default Places;
