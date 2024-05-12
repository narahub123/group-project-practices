import React from "react";
import "./planKanban.css";
import Columns from "./Columns/Columns";
const PlanKanban = () => {
  return (
    <div className="planKanban">
      <div className="container">
        <h1>Plan Kanban</h1>
        <div className="columnsContainer">
          <Columns />
        </div>
      </div>
    </div>
  );
};

export default PlanKanban;
