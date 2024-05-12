import React from "react";
import "./column.css";
import { days } from "../../../../../data/days";
import DragIndicator from "../../../SelectedPlaces/DragIndicator/DragIndicator";
import { SelectedPlaceType } from "../../../SelectedPlaces/SelectedPlace/SelectedPlace";

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
}: ColumnType) => {
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
        <div className="place">place</div>
      </div>
    </div>
  );
};

export default Column;
