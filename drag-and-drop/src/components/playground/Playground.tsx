import React, { useEffect, useState } from "react";
import "./playground.css";
import SelectedPlaces from "./SelectedPlaces/SelectedPlaces";
import PlanKanban from "./PlanKanban/PlanKanban";
import { selectedPlaces } from "../../data/selectedPlaces";
import { SelectedPlaceType } from "./SelectedPlaces/SelectedPlace/SelectedPlace";

const Playground = () => {
  const [places, setPlaces] = useState(selectedPlaces);
  const [ariaLabel, setAriaLabel] = useState(-1);
  const [active, setActive] = useState(false);
  const [firstPlace, setFirstPlace] = useState<SelectedPlaceType>(places[0]);
  const [column, setColumn] = useState(-1);

  useEffect(() => {
    setFirstPlace(places[0]);
  }, [places]);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    console.log("id:", e.currentTarget.ariaLabel);
    console.log(selectedPlaces[Number(e.currentTarget.ariaLabel) - 1]);

    const id = e.currentTarget.ariaLabel;

    const unselectedPlaces = places.filter((place) => place.id !== Number(id));

    // console.log(unselectedPlaces);

    e.dataTransfer?.setData("text/plain", id !== null ? id : "");
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("enter");
    const ariaLabel = Number(e.currentTarget?.ariaLabel);
    const dataColumn = Number(e.currentTarget.dataset.column);
    console.log(dataColumn);

    setAriaLabel(ariaLabel);
    setColumn(dataColumn);
    setActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("leave");
    setActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setActive(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("drop");

    console.log("firstPlace", firstPlace.id);

    console.log(e.currentTarget.ariaLabel);
    const dropzone = Number(e.currentTarget.ariaLabel);
    const drop = Number(e.dataTransfer?.getData("text/plain"));

    console.log("drop", drop);
    console.log("dropzone", dropzone);

    if (dropzone === -1 && drop !== firstPlace.id) {
      const droppedPlace = places.find((place) => place.id === drop);
      console.log(droppedPlace);
      const filteredPlaces = places.filter((place) => place.id !== drop);
      if (droppedPlace !== undefined)
        setPlaces([droppedPlace, ...filteredPlaces]);
    } else if (drop !== dropzone) {
      const droppedPlace = places.find((place) => place.id === drop);

      const newPlaces = places.filter((place) => place.id !== drop);
      const index = newPlaces.findIndex((place) => place.id === dropzone);

      const beforezone = newPlaces.slice(0, index + 1);
      const afterzone = newPlaces.slice(index + 1);
      const final = [...beforezone, droppedPlace, ...afterzone].filter(
        Boolean
      ) as SelectedPlaceType[];

      if (final !== undefined) {
        setPlaces(final);
      }
    }

    setActive(false);
  };
  return (
    <div className="playground">
      <div className="container">
        <div className="selectedPlacesList">
          <h1>Selected Places</h1>
          <SelectedPlaces
            handleDragStart={handleDragStart}
            handleDragEnter={handleDragEnter}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            places={places}
            ariaLabel={ariaLabel}
            active={active}
            setPlaces={setPlaces}
            column={column}
          />
          <div className="placesList">
            <ul></ul>
          </div>
        </div>
      </div>
      <div className="division"></div>
      <PlanKanban
        handleDragStart={handleDragStart}
        handleDragEnter={handleDragEnter}
        handleDragLeave={handleDragLeave}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        places={places}
        ariaLabel={ariaLabel}
        active={active}
        column={column}
      />
    </div>
  );
};

export default Playground;
