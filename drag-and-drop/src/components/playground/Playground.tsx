import React from "react";
import "./playground.css";

const Playground = () => {
  return (
    <div className="playground">
      <div className="container">
        <div className="selectedPlacesList">
          <h1>Selected Places</h1>
          <div className="placesList">
            <ul>
              <li draggable>
                <span className="image">
                  <img src="" alt="img" />
                </span>
                <span className="detail">
                  <p>
                    <b>name</b>
                  </p>
                  <span className="category">
                    <b>cate</b>
                  </span>
                  <span className="addr">Seoul Jong-ro Sejong-ro</span>
                </span>
                <span className="duplicate">
                  <nav>+</nav>
                </span>
              </li>
              <li draggable>
                <span className="image">
                  <img src="" alt="img" />
                </span>
                <span className="detail">
                  <p>
                    <b>name</b>
                  </p>
                  <span className="category">
                    <b>cate</b>
                  </span>
                  <span className="addr">Seoul Jong-ro Sejong-ro</span>
                </span>
                <span className="duplicate">
                  <nav>+</nav>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="division"></div>
      <div className="planKanban">
        <div className="container">
          <h1>Plan Kanban</h1>
          <div className="columnsContainer">
            <div className="columns">
              <div className="column">
                <p>5월 12일</p>
                <div className="placesContainer">
                  <div className="dropIndicator" />
                  <div className="place">place</div>
                </div>
              </div>
              <div className="column">
                <p>5월 13일</p>
                <div className="placesContainer">
                  <div className="dropIndicator" />
                  <div className="place">place</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
