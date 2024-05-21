import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import "./plan.css";
import { ScheduleDetailType, ScheduleType } from "../Choice";
import { PlaceApiDetailType } from "../places/PlaceModal";
import DragCard from "./DragCard";
import { LuTrash2 } from "react-icons/lu";
import {
  CalculateDuration,
  dateFormatter,
} from "../../../../utils/kakaoMap/time";
import DropIndicator from "./DropIndicator";
import DropCard from "./DropCard";

interface PlanType {
  schedule: ScheduleType;
  setSchedule: Dispatch<SetStateAction<ScheduleType>>;
  places: PlaceApiDetailType[];
  setPlaces: (value: PlaceApiDetailType[]) => void;
  selectedPlaces: string[];
  setSelectedPlaces: (value: string[]) => void;
  scheduleDetail: ScheduleDetailType[];
  setScheduleDetail: Dispatch<SetStateAction<ScheduleDetailType[]>>;
}

interface ColumnPlaces {
  [key: string]: PlaceApiDetailType[];
}

const Plan = ({
  setSchedule,
  schedule,
  places,
  setPlaces,
  selectedPlaces,
  setSelectedPlaces,
  scheduleDetail,
  setScheduleDetail,
}: PlanType) => {
  const [columnPlaces, setColumnPlaces] = useState<ColumnPlaces>({});
  const [title, setTitle] = useState("");

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const q = e.target.value;
    setTitle(q);
    setSchedule({
      ...schedule,
      schedule_name: q,
    });
  };

  console.log(schedule);

  // console.log(places);

  // console.log(columnPlaces);

  const dates = CalculateDuration(schedule.start_date, schedule.end_date);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    const curRow = e.currentTarget.dataset.row;
    const curCol = e.currentTarget.dataset.column;

    console.log(curRow);
    console.log(curCol);

    e.dataTransfer?.setData(
      "text/plain",
      curRow && curCol ? curRow + "_" + curCol : ""
    );
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {};

  const handlerDragLeave = (e: React.DragEvent<HTMLDivElement>) => {};

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const startingPoint = e.dataTransfer.getData("text/plain").split("_");

    const curRow = startingPoint[0];
    const curCol = startingPoint[1];
    console.log("startRow", curRow);
    console.log("startCol", curCol);
    const goalRow = e.currentTarget.dataset.row;
    const goalCol = e.currentTarget.dataset.column;
    console.log("endRow", goalRow);
    console.log("endCol", goalCol);

    const movedPlace =
      curCol === "-1"
        ? places?.find((place) => place.contentid === curRow)
        : columnPlaces[`column${curCol}`]?.find(
            (place) => place.contentid === curRow
          );
    const curPlaces = columnPlaces[`column${curCol}`];
    console.log(curPlaces);

    const goalPlaces = columnPlaces[`column${goalCol}`];
    console.log(goalPlaces);

    const filteredPlaces = places?.filter(
      (place) => place.contentid !== curRow
    );
    if (curCol === goalCol) {
      if (goalRow === "-1" && curRow !== goalRow) {
        movedPlace && setPlaces([movedPlace, ...filteredPlaces]);
      } else if (curRow !== goalRow) {
        const beforePlaces = filteredPlaces.slice(0, Number(goalRow));

        const afterPlaces = filteredPlaces.slice(Number(goalRow));

        movedPlace && setPlaces([...beforePlaces, movedPlace, ...afterPlaces]);
      }
    } else {
      if (movedPlace !== undefined) {
        const curFilteredPlaces = curPlaces?.filter(
          (place) => place.contentid !== curRow
        );
        if (goalRow === "-1") {
          // add a place to column
          setColumnPlaces((prevColumnPlaces) => ({
            ...prevColumnPlaces,
            [`column${goalCol}`]: goalPlaces
              ? [movedPlace, ...goalPlaces]
              : [movedPlace],
          }));

          // remove a place from selected list
          curCol === "-1" && setPlaces([...filteredPlaces]);
          curCol !== "-1" &&
            setColumnPlaces((prevColumnPlaces) => ({
              ...prevColumnPlaces,
              [`column${curCol}`]: [...curFilteredPlaces],
            }));

          if (curCol === "-1") {
            const updateDetail = {
              content_id: curRow,
              schedule_order: goalCol,
              start_time: new Date(dates[Number(goalCol)].setHours(10)),
              end_time: new Date(dates[Number(goalCol)].setHours(12)),
              createdAt: new Date(),
            };

            // actually not necessary
            const restDetails = scheduleDetail.filter(
              (detail) => detail.content_id !== curRow
            );

            const sameColDetails = restDetails
              .filter((detail) => detail.schedule_order === goalCol)
              .map((detail) => ({
                ...detail,
                createdAt: new Date(),
              }));

            const diffColDetails = restDetails.filter(
              (detail) => detail.schedule_order !== goalCol
            );

            setScheduleDetail([
              updateDetail,
              ...sameColDetails,
              ...diffColDetails,
            ]);
          } else {
            const currentDetail = scheduleDetail.find(
              (detail) => detail.content_id === curRow
            );
            const restDetails = scheduleDetail.filter(
              (detail) => detail.content_id !== curRow
            );
            const sameColDetails = restDetails
              .filter((detail) => detail.schedule_order === goalCol)
              .map((detail) => ({
                ...detail,
                createdAt: new Date(),
              }));

            const diffColDetails = restDetails.filter(
              (detail) => detail.schedule_order !== goalCol
            );
            console.log(currentDetail);
            setScheduleDetail([
              {
                ...currentDetail,
                schedule_order: goalCol,
                start_time: new Date(dates[Number(goalCol)].setHours(10)),
                end_time: new Date(dates[Number(goalCol)].setHours(12)),
                createdAt: new Date(),
              },
              ...sameColDetails,
              ...diffColDetails,
            ]);
          }
        } else {
          const beforePlaces = goalPlaces.slice(0, Number(goalRow));
          const afterPlaces = goalPlaces.slice(Number(goalRow));
          // add a place to target column
          setColumnPlaces((prevColumnPlaces) => ({
            ...prevColumnPlaces,
            [`column${goalCol}`]: [...beforePlaces, movedPlace, ...afterPlaces],
          }));

          // remove a place from original column
          curCol === "-1" && setPlaces([...filteredPlaces]);
          curCol !== "-1" &&
            setColumnPlaces((prevColumnPlaces) => ({
              ...prevColumnPlaces,
              [`column${curCol}`]: [...curFilteredPlaces],
            }));

          if (curCol === "-1") {
            // actually not necessary
            const restDetails = scheduleDetail.filter(
              (detail) => detail.content_id !== curRow
            );

            const sameColDetails = restDetails.filter(
              (detail) => detail.schedule_order === goalCol
            );

            const index = sameColDetails.findIndex(
              (detail) => detail.content_id === goalRow
            );
            const sameBeforeDetails = sameColDetails
              .slice(0, index)
              .map((detail) => ({
                ...detail,
                createdAt: new Date(),
              }));
            const updateDetail = {
              content_id: curRow,
              schedule_order: goalCol,
              start_time: new Date(dates[Number(goalCol)].setHours(10)),
              end_time: new Date(dates[Number(goalCol)].setHours(12)),
              createdAt: new Date(),
            };
            const sameafterDetails = sameColDetails
              .slice(index)
              .map((detail) => ({
                ...detail,
                createdAt: new Date(),
              }));

            const diffColDetails = restDetails.filter(
              (detail) => detail.schedule_order !== goalCol
            );

            setScheduleDetail([
              ...sameBeforeDetails,
              updateDetail,
              ...sameafterDetails,
              ...diffColDetails,
            ]);
          } else {
            const restDetails = scheduleDetail.filter(
              (detail) => detail.content_id !== curRow
            );

            const sameColDetails = restDetails.filter(
              (detail) => detail.content_id === curCol
            );

            const diffColDetails = restDetails.filter(
              (detail) => detail.content_id !== curRow
            );

            const index = diffColDetails.findIndex(
              (detail) => detail.content_id === goalRow
            );

            const diffBeforeDetails = diffColDetails
              .slice(0, index)
              .map((detail) => ({
                ...detail,
                createdAt: new Date(),
              }));

            const currentDetail = scheduleDetail.find(
              (detail) => detail.content_id === curRow
            );

            const diffAfterDetails = diffColDetails
              .slice(index)
              .map((detail) => ({
                ...detail,
                createdAt: new Date(),
              }));

            console.log(currentDetail);
            setScheduleDetail([
              ...diffBeforeDetails,
              {
                ...currentDetail,
                schedule_order: goalCol,
                createdAt: new Date(),
              },
              ...diffAfterDetails,
              ...sameColDetails,
            ]);
          }
        }
      }
    }
  };

  return (
    <div className="planDetail">
      <div className="planDetailList">
        <div className="title">
          <p>Selected List</p>
        </div>
        <div className="list">
          <ul>
            <DropIndicator
              dataRow={"-1"}
              dataCol={"-1"}
              onDragEnter={handleDragEnter}
              onDragLeave={handlerDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
            {places?.map((place) => (
              <>
                <DragCard
                  place={place}
                  schedule={schedule}
                  setSchedule={setSchedule}
                  places={places}
                  setPlaces={setPlaces}
                  selectedPlaces={selectedPlaces}
                  setSelectedPlaces={setSelectedPlaces}
                  key={place.contentid}
                  onDragStart={handleDragStart}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handlerDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                />
              </>
            ))}
          </ul>
        </div>
      </div>
      <div className="kanban">
        <header>
          <div className="title">
            <input
              type="text"
              placeholder="이번 여행의 이름을 정해주세요"
              onChange={(e) => handleTitle(e)}
            />
          </div>
          <p className="duration">
            {schedule.start_date && schedule.end_date
              ? `기간 ${dateFormatter(schedule.start_date)}~${dateFormatter(
                  schedule.end_date
                )}`
              : "dates have not yet to be set"}
          </p>
        </header>
        <div className="columns">
          <ul>
            {dates.map((date, column) => (
              <li className="column" key={column}>
                <div className="dateContainer">
                  <p className="date">{dateFormatter(date)}</p>
                </div>
                <DropIndicator
                  dataRow={"-1"}
                  dataCol={column.toString()}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handlerDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                />
                <div className="columnList">
                  <ul>
                    {columnPlaces[`column${column}`] &&
                      columnPlaces[`column${column}`].map((place, index) => (
                        <DropCard
                          place={place}
                          schedule={schedule}
                          setSchedule={setSchedule}
                          places={places}
                          setPlaces={setPlaces}
                          selectedPlaces={selectedPlaces}
                          setSelectedPlaces={setSelectedPlaces}
                          key={place.contentid}
                          onDragStart={handleDragStart}
                          onDragEnter={handleDragEnter}
                          onDragLeave={handlerDragLeave}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          curCol={column}
                          index={index}
                        />
                      ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Plan;
