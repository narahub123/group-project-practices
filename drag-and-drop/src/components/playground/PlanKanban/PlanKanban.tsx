import React from "react";
import "./planKanban.css";
import Columns, { ColumnsType } from "./Columns/Columns";
import { plans } from "../../../data/selectedPlaces";
import { SelectedPlaceType } from "../SelectedPlaces/SelectedPlace/SelectedPlace";

type KanbanType = {
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

const PlanKanban = ({
  handleDragStart,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  places,
  ariaLabel,
  active,
  column,
}: KanbanType) => {
  const plan = plans[0];

  const start = new Date(plan.tourStart);
  const end = new Date(plan.tourEnd);
  let diff = Math.abs(end.getTime() - start.getTime());
  diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
  console.log(start);
  console.log(end);
  console.log(diff);

  const dates = [];

  for (let i = 0; i <= diff; i++) {
    const startDay = new Date(start);
    const newDate = new Date(startDay.setDate(startDay.getDate() + i));
    dates.push(newDate);
  }

  console.log(dates);

  return (
    <div className="planKanban">
      <div className="container">
        <h1>Plan Kanban</h1>
        <div className="columnsContainer">
          <Columns
            dates={dates}
            handleDragStart={handleDragStart}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            places={places}
            ariaLabel={ariaLabel}
            active={active}
            column={column}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanKanban;
