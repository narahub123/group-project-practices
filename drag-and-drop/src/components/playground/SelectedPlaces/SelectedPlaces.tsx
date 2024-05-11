import React, { Dispatch, SetStateAction, useState } from "react";
import "./selectedPlaces.css";
import SelectedPlace from "./SelectedPlace/SelectedPlace";
import { selectedPlaces } from "../../../data/selectedPlaces";

const SelectedPlaces = () => {
  const [places, setPlaces] = useState(selectedPlaces);

  return (
    <div className="selectedPlaces">
      <ul>
        {places.map((place) => (
          <SelectedPlace
            key={place.id}
            id={place.id}
            name={place.name}
            addr={place.addr}
            contentTypeId={place.contentTypeId}
            img={place.img}
            setPlaces={setPlaces}
          />
        ))}
      </ul>
    </div>
  );
};

export default SelectedPlaces;
