import Procedure from "../pages/Procedure";
import Choice from "../pages/Choice";
import Map from "../pages/Map";
import "./layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Procedure />
      <Choice />
      <Map />
    </div>
  );
};

export default Layout;
