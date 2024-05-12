import React from "react";
import "./playground.css";
import SelectedPlaces from "./SelectedPlaces/SelectedPlaces";
import PlanKanban from "./PlanKanban/PlanKanban";

const Playground = () => {
  return (
    <div className="playground">
      <div className="container">
        <div className="selectedPlacesList">
          <h1>Selected Places</h1>
          <SelectedPlaces />
          <div className="placesList">
            <ul></ul>
          </div>
        </div>
      </div>
      <div className="division"></div>
      <PlanKanban />
    </div>
  );
};

export default Playground;
