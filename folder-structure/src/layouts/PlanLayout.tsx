import Process from "../pages/schedule/process/Process";
import Choice from "../pages/schedule/choice/Choice";

import "./planLayout.css";
import PlaceModal from "../pages/schedule/choice/places/PlaceModal";
import { useState } from "react";
import KakaoMap from "../pages/schedule/map/Map";

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
      <KakaoMap selectedPlaces={selectedPlaces} />
    </div>
  );
};

export default PlanLayout;
