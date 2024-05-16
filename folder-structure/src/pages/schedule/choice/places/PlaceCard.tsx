import React from "react";
import "./placeCard.css";

const PlaceCard = () => {
  const addr = "대한민국 제주특별자치도 제주시 성산동";
  return (
    <div className="placeCard">
      <span className="photo">
        <img src="" alt="사진" />
      </span>
      <span className="info">
        <p className="name">성산 일출봉</p>
        <p>
          <span className="cate">명소</span>
          <span className="addr">{`${addr.substring(0, 13)}...`}</span>
        </p>
      </span>
    </div>
  );
};

export default PlaceCard;
