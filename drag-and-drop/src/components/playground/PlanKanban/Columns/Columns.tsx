import React, { useState } from "react";
import "./columns.css";
import Column from "./Column/Column";
import { SelectedPlaceType } from "../../SelectedPlaces/SelectedPlace/SelectedPlace";
import { ColumnPlaces } from "../../Playground";

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
  columnPlaces: ColumnPlaces;
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
  columnPlaces,
}: ColumnsType) => {
  const [selectedPlaces, setSelectedPlaces] = useState<SelectedPlaceType[]>([]);

  const columnKeys = Object.keys(columnPlaces);
  const keys = columnKeys.map((columnKey) =>
    Number(columnKey.split("column")[1])
  );

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
          column={index}
          setSelectedPlaces={setSelectedPlaces}
          columnPlaces={columnPlaces[`column${index}`]}
        />
      ))}
    </div>
  );
};

export default Columns;
