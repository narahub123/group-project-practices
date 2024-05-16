import Process from "../pages/schedule/process/Process";
import Choice from "../pages/schedule/choice/Choice";
import Map from "../pages/schedule/map/Map";
import "./planLayout.css";

const PlanLayout = () => {
  return (
    <div className="plan">
      <Process />
      <Choice />
      <Map />
    </div>
  );
};

export default PlanLayout;
