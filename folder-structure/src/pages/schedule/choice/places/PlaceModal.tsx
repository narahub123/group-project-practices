import React, { useEffect, useState } from "react";

import Button from "../../../../components/ui/Button";
import { Link } from "react-router-dom";
import "./placeModal.css";
import { PlaceCardProps } from "./PlaceCard";
import { PlaceApiType } from "../../../../types/placeTypes";
import { contentTypeIds } from "../../../../data/contentTypeId";
import { metros } from "../../../../data/metro";

interface PlaceModalProps {
  contentId: string;
  contentTypeId: string;
  setActive?: (value: boolean) => void;
  active: boolean;
}

export interface PlaceApiDetailType extends PlaceApiType {
  overview: string;
}

const PlaceModal = ({
  contentId,
  contentTypeId,
  setActive,
}: PlaceModalProps) => {
  const [place, setPlace] = useState<PlaceApiDetailType | undefined>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/places/${contentId}`);

      const jsonData = await response.json();

      const filteredPlace = jsonData.map((data: PlaceApiDetailType) => ({
        addr1: data.addr1,
        addr2: data.addr2,
        areacode: data.areacode,
        contentid: data.contentid,
        contenttypeid: data.contenttypeid,
        title: data.title,
        firstimage: data.firstimage,
        overview: data.overview,
      }));

      setPlace(filteredPlace[0]);

      // console.log(filteredPlace);
    };

    fetchData();
  }, [contentId]);

  const addr = place !== undefined && place.addr1 + place.addr2;

  return (
    <div className="placeModal">
      <div
        className="background"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          const target = e.target as HTMLDivElement;
          const className = target.className;

          className === "background" && setActive && setActive(false);
        }}
      >
        <div className="container">
          {place ? (
            <div className="expl">
              <p>
                <span className="name">{place.title}</span>
                <span className="cate">
                  {contentTypeIds[Number(place.contenttypeid)]}
                </span>
              </p>
              <p className="photoContainer">
                <img
                  src={
                    place.firstimage === ""
                      ? metros.find(
                          (metro) =>
                            metro.areaCode.toString() === place.areacode
                        )?.imgUrl
                      : place.firstimage
                  }
                  alt={place.title}
                />
              </p>
              <p className="description">{place.overview}</p>
              <p className="addr">주소 : {addr}</p>
            </div>
          ) : (
            <p>로딩 중..</p>
          )}
          <div className="buttons">
            <Button text="이전" setActive={setActive} />
            <Link to="">
              <Button text="일정 만들기" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;
