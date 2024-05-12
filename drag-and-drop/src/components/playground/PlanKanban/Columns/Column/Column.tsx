import React from "react";
import "./column.css";

const Column = () => {
  return (
    <div className="column">
      <p>5월 12일</p>
      <div className="placesContainer">
        <div className="dropIndicator" />
        <div className="place">place</div>
      </div>
    </div>
  );
};

export default Column;
