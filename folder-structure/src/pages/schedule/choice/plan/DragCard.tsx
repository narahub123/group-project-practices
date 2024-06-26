import React, { Dispatch, SetStateAction } from "react";
import "./dragCard.css";
import { PlaceCardProps } from "../places/PlaceCard";
import { contentTypeIds } from "../../../../data/contentTypeId";
import { metros } from "../../../../data/metro";
import DropIndicator from "./DropIndicator";
import { LuTrash2 } from "react-icons/lu";
import { PlaceApiDetailType } from "../places/PlaceModal";
import { ScheduleType } from "../Choice";
interface DragCardProps {
  place: PlaceCardProps;
  schedule: ScheduleType;
  setSchedule: Dispatch<SetStateAction<ScheduleType>>;
  places: PlaceApiDetailType[];
  setPlaces: (value: PlaceApiDetailType[]) => void;
  selectedPlaces: string[];
  setSelectedPlaces: (value: string[]) => void;
  onDragStart: React.DragEventHandler<HTMLLIElement>;
  onDragEnter: React.DragEventHandler<HTMLDivElement>;
  onDragLeave: React.DragEventHandler<HTMLDivElement>;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onDrop: React.DragEventHandler<HTMLDivElement>;
}

const DragCard = ({
  place,
  setSchedule,
  schedule,
  places,
  setPlaces,
  selectedPlaces,
  setSelectedPlaces,
  onDragStart,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
}: DragCardProps) => {
  const handleDelete = (contentId: string) => {
    const filteredPlaces = places.filter(
      (place) => place.contentid !== contentId
    );

    const filteredSelectedPlaces = selectedPlaces.filter(
      (place) => place !== contentId
    );

    const schedulePlaces = schedule.schedule_detail?.filter(
      (place) => place.content_id !== contentId
    );
    setSchedule({
      ...schedule,
      schedule_detail: schedulePlaces,
    });
    setPlaces(filteredPlaces);
    setSelectedPlaces(filteredSelectedPlaces);
  };
  return (
    <>
      <li
        className="dragCard"
        draggable
        onDragStart={onDragStart}
        data-row={place.contentid}
        data-column="-1"
      >
        <span className="container">
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
        </span>
        <span className="trash" onClick={() => handleDelete(place.contentid)}>
          <LuTrash2 />
        </span>
      </li>
      <DropIndicator
        dataRow={place.contentid}
        dataCol={"-1"}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    </>
  );
};

export default DragCard;
