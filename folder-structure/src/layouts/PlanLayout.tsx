import Process from "../pages/schedule/process/Process";
import Choice, {
  ScheduleDetailType,
  ScheduleType,
} from "../pages/schedule/choice/Choice";

import "./planLayout.css";
import PlaceModal from "../pages/schedule/choice/places/PlaceModal";
import { useState } from "react";
import KakaoMap from "../pages/schedule/map/Map";

const PlanLayout = () => {
  const [active, setActive] = useState(false);
  const [contentId, setContentId] = useState("");
  const [contentTypeId, setContentTypeId] = useState("1");
  const [schedule, setSchedule] = useState<ScheduleType>({});
  const [scheduleDetail, setScheduleDetail] = useState<ScheduleDetailType[]>(
    []
  );

  console.log(schedule);
  console.log(scheduleDetail);

  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);

  return (
    <div className="plan" style={active ? { overflow: "hidden" } : undefined}>
      {active && (
        <PlaceModal
          setActive={setActive}
          contentId={contentId}
          contentTypeId={contentTypeId}
          active={active}
        />
      )}
      <Process
        schedule={schedule}
        setSchedule={setSchedule}
        scheduleDetail={scheduleDetail}
      />
      <Choice
        contentTypeId={contentTypeId}
        setActive={setActive}
        setContentId={setContentId}
        setContentTypeId={setContentTypeId}
        selectedPlaces={selectedPlaces}
        setSelectedPlaces={setSelectedPlaces}
        scheduleDetail={scheduleDetail}
        setScheduleDetail={setScheduleDetail}
        schedule={schedule}
        setSchedule={setSchedule}
      />
      <KakaoMap selectedPlaces={selectedPlaces} />
    </div>
  );
};

export default PlanLayout;
