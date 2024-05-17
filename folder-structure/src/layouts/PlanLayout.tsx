import Process from "../pages/schedule/process/Process";
import Choice from "../pages/schedule/choice/Choice";
import Map from "../pages/schedule/map/Map";
import "./planLayout.css";
import PlaceModal from "../pages/schedule/choice/places/PlaceModal";
import { useState } from "react";

const PlanLayout = () => {
  const [active, setActive] = useState(false);
  const [contentId, setContentId] = useState("");
  const [contentTypeId, setContentTypeId] = useState("1");

  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);

  return (
    <div className="plan">
      {active && (
        <PlaceModal
          setActive={setActive}
          contentId={contentId}
          contentTypeId={contentTypeId}
          active={active}
        />
      )}
      <Process setContentTypeId={setContentTypeId} />
      <Choice
        contentTypeId={contentTypeId}
        setActive={setActive}
        setContentId={setContentId}
        setContentTypeId={setContentTypeId}
        selectedPlaces={selectedPlaces}
        setSelectedPlaces={setSelectedPlaces}
      />
      <Map />
    </div>
  );
};

export default PlanLayout;
