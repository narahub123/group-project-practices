import React, { useEffect, useState } from "react";
import "./placesList.css";
import Search from "../../../../components/ui/Search";
import PlaceCard, { PlaceCardProps } from "./PlaceCard";
import { PlaceApiType } from "../../../../types/placeTypes";
import { useParams } from "react-router-dom";
import { AreaCode } from "../../../../data/areacode";

const PlacesList = () => {
  const [places, setPlaces] = useState<PlaceCardProps[]>([]);

  const parmas = useParams();

  const areacode = Object.entries(AreaCode).find((area) =>
    area[0].includes(parmas.metro ?? "")
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!areacode) {
          return;
        }
        const response = await fetch(
          `http://localhost:8080/places/${areacode[1]}`
        );

        const jsonData = await response.json();
        console.log(jsonData);

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
  }, []);

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
