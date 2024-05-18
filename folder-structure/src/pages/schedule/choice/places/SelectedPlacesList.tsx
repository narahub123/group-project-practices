import React, { useEffect, useState } from "react";
import "./selectedPlacesList.css";
import PlaceCard from "./PlaceCard";
import { LuTrash2 } from "react-icons/lu";
import { SchedulePlus } from "./PlacesList";
import { PlaceApiDetailType } from "./PlaceModal";

const SelectedPlacesList = ({
  setActive,
  setSchedule,
  setContentId,
  setContentTypeId,
  selectedPlaces,
  setSelectedPlaces,
}: SchedulePlus) => {
  const [places, setPlaces] = useState<PlaceApiDetailType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const responses = await Promise.all(
        selectedPlaces.map(async (contentId) => {
          const response = await fetch(
            `http://localhost:8080/places/${contentId}`
          );

          const jsonData = await response.json();

          return jsonData.map((data: PlaceApiDetailType) => ({
            addr1: data.addr1,
            addr2: data.addr2,
            areacode: data.areacode,
            contentid: data.contentid,
            contenttypeid: data.contenttypeid,
            title: data.title,
            firstimage: data.firstimage,
            overview: data.overview,
          }))[0];
        })
      );

      setPlaces(responses);
    };

    fetchData();
  }, [selectedPlaces]);

  const handleDelete = (contentId: string) => {
    const filteredPlaces = places.filter(
      (place) => place.contentid !== contentId
    );
    const filteredContentIds = selectedPlaces.filter(
      (place) => place !== contentId
    );

    setSelectedPlaces(filteredContentIds);
    setPlaces(filteredPlaces);
  };

  // console.log(selectedPlaces);
  // console.log(places);

  return (
    <div className="selectedPlacesList">
      <div className="info">
        <span className="count">{places.length}</span>
        <span className="reset" onClick={() => setSelectedPlaces([])}>
          장소 설정 초기화
        </span>
      </div>
      <div className="selectedList">
        <ul>
          {places.map((place, index) => (
            <li key={index}>
              <span className="index">
                <p>{index + 1}</p>
              </span>

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

              <span
                className="trash"
                onClick={() => handleDelete(place.contentid)}
              >
                <LuTrash2 />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectedPlacesList;
