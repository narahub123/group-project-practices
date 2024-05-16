import React from "react";
import "./placeCard.css";
import { contentTypeIds } from "../../../../data/contentTypeId";
import { metros } from "../../../../data/metro";

export interface PlaceCardProps {
  addr1: string;
  addr2: string;
  areacode: string;
  contentid: string;
  contenttypeid: string;
  title: string;
  firstimage: string;
}

const PlaceCard = ({
  addr1,
  addr2,
  areacode,
  contentid,
  contenttypeid,
  title,
  firstimage,
}: PlaceCardProps) => {
  const addr = addr1 + addr2;

  return (
    <div className="placeCard">
      <span className="photo">
        <img
          src={
            firstimage === "" ? metros[Number(areacode)]?.imgUrl : firstimage
          }
          alt="사진"
        />
      </span>
      <span className="info">
        <p className="name">{title}</p>
        <p>
          <span className="cate">{contentTypeIds[Number(contenttypeid)]}</span>
          <span className="addr">{`${addr.substring(0, 13)}...`}</span>
        </p>
      </span>
    </div>
  );
};

export default PlaceCard;
