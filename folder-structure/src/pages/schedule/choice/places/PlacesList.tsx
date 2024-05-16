import React from "react";
import "./placesList.css";
import Search from "../../../../components/ui/Search";
import PlaceCard from "./PlaceCard";

const PlacesList = () => {
  return (
    <div className="placesList">
      <div className="info">
        <p className="name">제주</p>
        <p className="duration">2024.05.17(금)~2024.05.18(토)</p>
      </div>
      <div className="search">
        <Search />
      </div>
      <div className="category">
        <ul>
          <li>전체</li>
          <li>관광</li>
          <li>문화</li>
          <li>식당</li>
        </ul>
      </div>
      <div className="placeList">
        <ul>
          <li>
            <span>
              <PlaceCard />
            </span>
            <span className="plus">
              <p>+</p>
            </span>
          </li>
          <li>
            <span>
              <PlaceCard />
            </span>
            <span className="plus">
              <p>+</p>
            </span>
          </li>
          <li>
            <span>
              <PlaceCard />
            </span>
            <span className="plus">
              <p>+</p>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PlacesList;
