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
  contentTypeId: string;
  setContentId: (value: string) => void;
  setContentTypeId: (value: string) => void;
  setActive: (value: boolean) => void;
  selectedPlaces: string[];
  setSelectedPlaces: (value: string[]) => void;
}

const PlacesList = ({
  schedule,
  setSchedule,
  contentTypeId,
  setContentId,
  setContentTypeId,
  setActive,
  selectedPlaces,
  setSelectedPlaces,
}: SchedulePlus) => {
  const [places, setPlaces] = useState<PlaceCardProps[]>([]);
  const [isON, setIsOn] = useState(false);

  const parmas = useParams();

  const location = useLocation();

  const { hash } = location;

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

        if (hash === "#link3") {
          contentTypeId = "32";
        } else if (
          hash === "#link2" &&
          contentTypeId !== "12" &&
          contentTypeId !== "14" &&
          contentTypeId !== "39"
        ) {
          contentTypeId = "1";
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

        setPlaces(filteredPlaces);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [hash, contentTypeId]);

  const handleFliter = (contentTypeId: string) => {
    setContentTypeId(contentTypeId);
    setIsOn(true);
  };

  const handlePlus = (contentId: string) => {
    const prevPlaces = selectedPlaces;

    setSelectedPlaces([...prevPlaces, contentId]);
  };

  const handleMinus = (contentId: string) => {
    const newPlaces = selectedPlaces.filter((place) => place !== contentId);

    setSelectedPlaces([...newPlaces]);
  };

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
          {hash !== "#link3" ? (
            <>
              <li
                className={
                  contentTypeId === "1" || (contentTypeId === "1" && isON)
                    ? "link active"
                    : "link"
                }
                onClick={() => handleFliter("1")}
              >
                전체
              </li>
              <li
                className={
                  contentTypeId === "12" && isON ? "link active" : "link"
                }
                onClick={() => handleFliter("12")}
              >
                관광
              </li>
              <li
                className={
                  contentTypeId === "14" && isON ? "link active" : "link"
                }
                onClick={() => handleFliter("14")}
              >
                문화
              </li>
              <li
                className={
                  contentTypeId === "39" && isON ? "link active" : "link"
                }
                onClick={() => handleFliter("39")}
              >
                식당
              </li>
            </>
          ) : (
            <li>숙소</li>
          )}
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

              {selectedPlaces.includes(place.contentid) ? (
                <span className="minus">
                  <p onClick={() => handleMinus(place.contentid)}>-</p>
                </span>
              ) : (
                <span className="plus">
                  <p onClick={() => handlePlus(place.contentid)}>+</p>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlacesList;
