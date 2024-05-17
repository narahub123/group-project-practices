import React, { useEffect, useState } from "react";
import "./placesList.css";
import Search from "../../../../components/ui/Search";
import PlaceCard, { PlaceCardProps } from "./PlaceCard";
import { PlaceApiType } from "../../../../types/placeTypes";
import { useLocation, useParams } from "react-router-dom";
import { AreaCode } from "../../../../data/areacode";
import { ScheduleProps } from "../Choice";
import { metros } from "../../../../data/metro";

export interface SchedulePlus extends ScheduleProps {
  setContentId: (value: string) => void;
  setContentTypeId: (value: string) => void;
  setActive: (value: boolean) => void;
}

const PlacesList = ({
  schedule,
  setSchedule,
  setContentId,
  setContentTypeId,
  setActive,
}: SchedulePlus) => {
  const [places, setPlaces] = useState<PlaceCardProps[]>([]);

  const parmas = useParams();

  const location = useLocation();

  const { hash } = location;

  const contentTypeId = hash === "#link2" ? "1" : "32";
  const areacode = Object.entries(AreaCode).find((area) =>
    area[0].includes(parmas.metro ?? "")
  );

  let areaName;
  if (areacode) {
    areaName = metros.find((metro) => metro.areaCode === Number(areacode[1]));
  } else {
    console.log("Areacode is not found");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!areacode) {
          return;
        }

        const response = await fetch(
          `http://localhost:8080/places/${areacode[1]}/${contentTypeId}`
        );

        const jsonData = await response.json();

        const filteredPlaces = jsonData.map((data: PlaceApiType) => ({
          addr1: data.addr1,
          addr2: data.addr2,
          areacode: data.areacode,
          contentid: data.contentid,
          contenttypeid: data.contenttypeid,
          title: data.title,
          firstimage: data.firstimage,
        }));
        console.log(filteredPlaces);

        setPlaces(filteredPlaces);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [hash]);

  return (
    <div className="placesList">
      <div className="info">
        {areaName && <p className="name">{areaName?.name}</p>}
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
          {places.map((place) => (
            <li key={place.contentid}>
              <span>
                <PlaceCard
                  addr1={place.addr1}
                  addr2={place.addr2}
                  areacode={place.areacode}
                  contentid={place.contentid}
                  contenttypeid={place.contenttypeid}
                  title={place.title}
                  firstimage={place.firstimage}
                  setContentId={setContentId}
                  setContentTypeId={setContentTypeId}
                  setActive={setActive}
                />
              </span>
              <span className="plus">
                <p>+</p>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlacesList;
