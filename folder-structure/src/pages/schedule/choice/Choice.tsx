import React from "react";
import { useLocation } from "react-router-dom";
import "./choice.css";

import Dates from "./dates/Dates";
import Places from "./places/Places";

const Choice = () => {
  const location = useLocation();
  const { hash } = location;

  return (
    <div className="choice">
      {(hash === "" || hash === "#link1") && <Dates />}
      {(hash === "#link2" || hash === "#link3") && <Places />}
    </div>
  );
};

export default Choice;
