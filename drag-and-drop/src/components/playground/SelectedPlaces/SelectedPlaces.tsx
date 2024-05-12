import React, { useEffect, useState } from "react";
import "./selectedPlaces.css";
import SelectedPlace from "./SelectedPlace/SelectedPlace";
import { selectedPlaces } from "../../../data/selectedPlaces";
import DragIndicator from "./DragIndicator/DragIndicator";
import { SelectedPlaceType } from "./SelectedPlace/SelectedPlace";

const SelectedPlaces = () => {
  const [places, setPlaces] = useState(selectedPlaces);
  const [ariaLabel, setAriaLabel] = useState(-1);
  const [active, setActive] = useState(false);
  const [firstPlace, setFirstPlace] = useState<SelectedPlaceType>(places[0]);

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
    // console.log(ariaLabel);

    setAriaLabel(ariaLabel);
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
    <div className="selectedPlaces">
      <ul>
        <DragIndicator
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          id={-1}
          ariaLabel={ariaLabel}
          active={active}
        />
        {places.map((place, index) => (
          <>
            <SelectedPlace
              key={index}
              id={place.id}
              name={place.name}
              description={place.description}
              addr={place.addr}
              contentTypeId={place.contentTypeId}
              img={place.img}
              createdAt={place.createdAt}
              setPlaces={setPlaces}
              handleDragStart={handleDragStart}
              handleDragEnter={handleDragEnter}
              handleDragLeave={handleDragLeave}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              ariaLabel={ariaLabel}
              active={active}
            />
          </>
        ))}
      </ul>
    </div>
  );
};

export default SelectedPlaces;
