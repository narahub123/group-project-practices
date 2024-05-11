import React from "react";
import "./playground.css";
import SelectedPlaces from "./SelectedPlaces/SelectedPlaces";

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
      <div className="planKanban">
        <div className="container">
          <h1>Plan Kanban</h1>
          <div className="columnsContainer">
            <div className="columns">
              <div className="column">
                <p>5월 12일</p>
                <div className="placesContainer">
                  <div className="dropIndicator" />
                  <div className="place">place</div>
                </div>
              </div>
              <div className="column">
                <p>5월 13일</p>
                <div className="placesContainer">
                  <div className="dropIndicator" />
                  <div className="place">place</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
