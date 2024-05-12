import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./selectedPlaces.css";
import SelectedPlace, {
  SelectedPlaceType,
} from "./SelectedPlace/SelectedPlace";
import DragIndicator from "./DragIndicator/DragIndicator";

type SetPlaceType = Dispatch<SetStateAction<SelectedPlaceType[]>>;

interface SelectedPlacesType {
  handleDragStart: React.DragEventHandler<HTMLLIElement>;
  handleDragEnter: React.DragEventHandler<HTMLDivElement>;
  handleDragLeave: React.DragEventHandler<HTMLDivElement>;
  handleDragOver: React.DragEventHandler<HTMLDivElement>;
  handleDrop: React.DragEventHandler<HTMLDivElement>;
  places: SelectedPlaceType[];
  ariaLabel: number;
  active: boolean;
  setPlaces: SetPlaceType;
  column: number;
}

const SelectedPlaces = ({
  handleDragStart,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  places,
  ariaLabel,
  active,
  setPlaces,
  column,
}: SelectedPlacesType) => {
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
          dataColumn={-1}
          column={column}
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
              column={column}
            />
          </>
        ))}
      </ul>
    </div>
  );
};

export default SelectedPlaces;
