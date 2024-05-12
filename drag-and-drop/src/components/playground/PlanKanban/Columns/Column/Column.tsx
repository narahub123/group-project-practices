import React, { Dispatch, SetStateAction, useState } from "react";
import "./column.css";
import { days } from "../../../../../data/days";
import DragIndicator from "../../../SelectedPlaces/DragIndicator/DragIndicator";
import SelectedPlace, {
  SelectedPlaceType,
  SetPlaceType,
} from "../../../SelectedPlaces/SelectedPlace/SelectedPlace";
import { ColumnPlaces } from "../../../Playground";

type ColumnType = {
  date: Date;
  handleDragStart: React.DragEventHandler<HTMLLIElement>;
  handleDragEnter: React.DragEventHandler<HTMLDivElement>;
  handleDragLeave: React.DragEventHandler<HTMLDivElement>;
  handleDragOver: React.DragEventHandler<HTMLDivElement>;
  handleDrop: React.DragEventHandler<HTMLDivElement>;
  places: SelectedPlaceType[];
  ariaLabel: number;
  active: boolean;
  dataColumn: number;
  column: number;
  setSelectedPlaces: SetPlaceType;
  columnPlaces: SelectedPlaceType[];
};

const Column = ({
  date,
  handleDragStart,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  places,
  ariaLabel,
  active,
  dataColumn,
  column,
  setSelectedPlaces,
  columnPlaces,
}: ColumnType) => {
  // const [columnPlaces, setColumnPlaces] = useState([]);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateForm = date.getDate();
  const day = date.getDay();

  return (
    <div className="column">
      <p className="date">{`${year}년 ${month}월 ${dateForm}일 (${days[day]})`}</p>
      <div className="placesContainer">
        <DragIndicator
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          id={-1}
          ariaLabel={ariaLabel}
          active={active}
          dataColumn={dataColumn}
          column={column}
        />
        <div className="place">
          {columnPlaces?.map((columnPlace, index) => (
            <SelectedPlace
              key={index}
              id={columnPlace.id}
              name={columnPlace.name}
              description={columnPlace.description}
              addr={columnPlace.addr}
              contentTypeId={columnPlace.contentTypeId}
              img={columnPlace.img}
              createdAt={columnPlace.createdAt}
              setPlaces={setSelectedPlaces}
              handleDragStart={handleDragStart}
              handleDragEnter={handleDragEnter}
              handleDragLeave={handleDragLeave}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              ariaLabel={ariaLabel}
              active={active}
              column={column}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Column;
