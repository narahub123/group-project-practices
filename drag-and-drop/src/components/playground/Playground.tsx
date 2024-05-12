import React, { useEffect, useState } from "react";
import "./playground.css";
import SelectedPlaces from "./SelectedPlaces/SelectedPlaces";
import PlanKanban from "./PlanKanban/PlanKanban";
import { selectedPlaces } from "../../data/selectedPlaces";
import { SelectedPlaceType } from "./SelectedPlaces/SelectedPlace/SelectedPlace";

export interface ColumnPlaces {
  [key: string]: SelectedPlaceType[];
}

const Playground = () => {
  const [places, setPlaces] = useState(selectedPlaces);
  const [ariaLabel, setAriaLabel] = useState(-1);
  const [active, setActive] = useState(false);
  const [firstPlace, setFirstPlace] = useState<SelectedPlaceType>(places[0]);
  const [column, setColumn] = useState(-1);
  const [columnPlaces, setColumnPlaces] = useState<ColumnPlaces>({});

  useEffect(() => {
    setFirstPlace(places[0]);
  }, [places]);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    console.log("id:", e.currentTarget.ariaLabel);
    console.log(selectedPlaces[Number(e.currentTarget.ariaLabel) - 1]);

    const id = e.currentTarget.ariaLabel;
    const col = e.currentTarget.dataset.column;
    console.log("col", col);

    e.dataTransfer?.setData(
      "text/plain",
      id !== null && col !== null ? id + "_" + col : ""
    );
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("enter");
    const ariaLabel = Number(e.currentTarget?.ariaLabel);
    const dataColumn = Number(e.currentTarget.dataset.column);
    console.log("order", ariaLabel);

    console.log("column", dataColumn);

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
    const data = e.dataTransfer.getData("text/plain").split("_");

    const drop = Number(data[0]);
    const col = Number(data[1]); // 이동 전 컬럼
    const column = Number(e.currentTarget.dataset.column); // 이동 후 컬럼

    console.log("drop", drop);
    console.log("dropzone", dropzone);
    console.log("column", column);
    console.log("col", col);

    const dragPlaces = col === -1 ? places : columnPlaces[`column${col}`];

    if (column === col) {
      if (dropzone === -1 && drop !== firstPlace.id) {
        const droppedPlace = dragPlaces.find((place) => place.id === drop);

        const filteredPlaces = dragPlaces.filter((place) => place.id !== drop);
        if (droppedPlace !== undefined) {
          if (column === -1) {
            setPlaces([droppedPlace, ...filteredPlaces]);
          } else {
            columnPlaces[`column${column}`] = [droppedPlace, ...filteredPlaces];
          }
        }
      } else if (drop !== dropzone) {
        const droppedPlace = dragPlaces.find((place) => place.id === drop);

        const newPlaces = dragPlaces.filter((place) => place.id !== drop);
        console.log(newPlaces);

        const index = newPlaces.findIndex((place) => place.id === dropzone);

        const beforezone = newPlaces.slice(0, index + 1);
        const afterzone = newPlaces.slice(index + 1);
        const final = [...beforezone, droppedPlace, ...afterzone].filter(
          Boolean
        ) as SelectedPlaceType[];

        if (final !== undefined && column === -1) {
          setPlaces(final);
        } else {
          columnPlaces[`column${column}`] = final;
        }
      }
    } else if (column !== col) {
      const prePlaces = columnPlaces[`column${col}`];
      const postPlaces = columnPlaces[`column${column}`];
      console.log("pre", prePlaces);
      console.log("post", postPlaces);
      console.log(dropzone);
      const findPlace = dragPlaces?.find((place) => place.id === drop);
      console.log("dragged", findPlace);
      const restPlaces = dragPlaces.filter((place) => place.id !== drop);

      if (findPlace !== undefined) {
        if (!postPlaces || postPlaces.length === 0) {
          columnPlaces[`column${column}`] = [findPlace];
          col === -1 && setPlaces(restPlaces);
          col !== -1 && (columnPlaces[`column${col}`] = restPlaces);
        } else if (postPlaces && dropzone === -1) {
          columnPlaces[`column${column}`] = [findPlace, ...postPlaces];

          col === -1 && setPlaces(restPlaces);
          col !== -1 && (columnPlaces[`column${col}`] = restPlaces);
        } else if (postPlaces && dropzone !== -1) {
          const newPlaces = columnPlaces[`column${column}`];
          console.log("hihfoiahfosida", newPlaces);

          const index = newPlaces.findIndex((place) => place.id === dropzone);

          const beforezone = newPlaces.slice(0, index + 1);
          const afterzone = newPlaces.slice(index + 1);
          const final = [...beforezone, findPlace, ...afterzone].filter(
            Boolean
          ) as SelectedPlaceType[];

          columnPlaces[`column${column}`] = final;

          if (final !== undefined) {
            col === -1 && setPlaces(restPlaces);
            col !== -1 && (columnPlaces[`column${col}`] = restPlaces);
          }
        }
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
        columnPlaces={columnPlaces}
      />
    </div>
  );
};

export default Playground;
