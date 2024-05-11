import React, { Dispatch, SetStateAction } from "react";
import "./selectedPlace.css";

type SelectedPlaceType = {
  id: number;
  name: string;
  addr: string;
  contentTypeId: number;
  img: string;
};

type SetPlaceType = Dispatch<SetStateAction<SelectedPlaceType[]>>;

interface SelectedPlacesType {
  id: number;
  name: string;
  addr: string;
  contentTypeId: number;
  img: string;
  setPlaces: SetPlaceType;
}

enum ContentType {
  "관광" = 12,
  "문화" = 13,
  "음식점" = 14,
  "숙소" = 15,
}

const SelectedPlace: React.FC<SelectedPlacesType> = ({
  id,
  name,
  addr,
  contentTypeId,
  img,
  setPlaces,
}) => {
  const handleDuplicate = () => {
    setPlaces((prev) => {
      return [...prev, { id, name, addr, contentTypeId, img }];
    });
  };
  return (
    <li draggable className="selectedPlace">
      <span className="image">
        <img src={img} alt="img" />
      </span>
      <span className="detail">
        <p>
          <b>{name}</b>
        </p>
        <span className="category">
          <b>{ContentType[contentTypeId]}</b>
        </span>
        <span className="addr">{addr}</span>
      </span>
      <span className="duplicate">
        <nav onClick={() => handleDuplicate()}>+</nav>
      </span>
    </li>
  );
};

export default SelectedPlace;
