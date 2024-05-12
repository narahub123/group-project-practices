import React, { Dispatch, SetStateAction } from "react";
import "./selectedPlace.css";
import DragIndicator from "../DragIndicator/DragIndicator";

export type SelectedPlaceType = {
  id: number;
  name: string;
  description: string;
  addr: string;
  contentTypeId: number;
  img: string;
  createdAt: string;
};

export type SetPlaceType = Dispatch<SetStateAction<SelectedPlaceType[]>>;

interface SelectedPlacesType {
  id: number;
  name: string;
  description: string;
  addr: string;
  contentTypeId: number;
  img: string;
  createdAt: string;
  setPlaces: SetPlaceType;
  handleDragStart: React.DragEventHandler<HTMLLIElement>;
  handleDragEnter: React.DragEventHandler<HTMLDivElement>;
  handleDragLeave: React.DragEventHandler<HTMLDivElement>;
  handleDragOver: React.DragEventHandler<HTMLDivElement>;
  handleDrop: React.DragEventHandler<HTMLDivElement>;
  ariaLabel: number;
  active: boolean;
  column: number;
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
  description,
  addr,
  contentTypeId,
  img,
  createdAt,
  setPlaces,
  handleDragStart,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  ariaLabel,
  active,
  column,
}) => {
  const handleDuplicate = () => {
    setPlaces((prev) => {
      return [
        ...prev,
        { id, name, addr, description, contentTypeId, img, createdAt },
      ];
    });
  };

  // console.log(column);

  return (
    <>
      <li
        draggable="true"
        className="selectedPlace"
        onDragStart={handleDragStart}
        id={id.toString()}
        aria-label={id.toString()}
        data-column={column}
      >
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
      <DragIndicator
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        id={id}
        ariaLabel={ariaLabel}
        active={active}
        dataColumn={column}
        column={column}
      />
    </>
  );
};

export default SelectedPlace;
