import React from "react";
import "./columns.css";
import Column from "./Column/Column";
import { SelectedPlaceType } from "../../SelectedPlaces/SelectedPlace/SelectedPlace";

export type ColumnsType = {
  dates: Date[];
  handleDragStart: React.DragEventHandler<HTMLLIElement>;
  handleDragEnter: React.DragEventHandler<HTMLDivElement>;
  handleDragLeave: React.DragEventHandler<HTMLDivElement>;
  handleDragOver: React.DragEventHandler<HTMLDivElement>;
  handleDrop: React.DragEventHandler<HTMLDivElement>;
  places: SelectedPlaceType[];
  ariaLabel: number;
  active: boolean;
  column: number;
};

const Columns = ({
  dates,
  handleDragStart,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  places,
  ariaLabel,
  active,
  column,
}: ColumnsType) => {
  return (
    <div className="columns">
      {dates.map((date, index) => (
        <Column
          date={date}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          places={places}
          ariaLabel={ariaLabel}
          active={active}
          dataColumn={index}
          column={column}
        />
      ))}
    </div>
  );
};

export default Columns;
