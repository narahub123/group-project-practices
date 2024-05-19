import React from "react";
import "./dropCard.css";
import { PlaceCardProps } from "../places/PlaceCard";
import { contentTypeIds } from "../../../../data/contentTypeId";
import { metros } from "../../../../data/metro";
interface DropCardProps {
  place: PlaceCardProps;
}

const DropCard = ({ place }: DropCardProps) => {
  return (
    <div className="dropCard" draggable>
      <div className="container">
        <span className="photo">
          <img
            src={
              place.firstimage === ""
                ? metros.find(
                    (metro) => metro.areaCode.toString() === place.areacode
                  )?.imgUrl
                : place.firstimage
            }
            alt="사진"
          />
        </span>
        <span className="info">
          <p className="name">{place.title}</p>
          <p>
            <span className="cate">
              {contentTypeIds[Number(place.contenttypeid)]}
            </span>
            <span className="addr">{place.addr1}</span>
          </p>
        </span>
      </div>
    </div>
  );
};

export default DropCard;
