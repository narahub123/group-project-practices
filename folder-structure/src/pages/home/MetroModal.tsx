import React from "react";
import { MetroType } from "../../data/metro";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

interface MetroModalProps {
  metro: MetroType;
  setActive?: (value: boolean) => void;
}

const MetroModal = ({ metro, setActive }: MetroModalProps) => {
  return (
    <div className="metroModal">
      <div>
        <span className="desc">
          <p>{metro.name}</p>
          <p>{metro.description}</p>
        </span>
        <img src={metro.imgUrl} alt={metro.name} />
      </div>
      <div>
        <Button text="이전" setActive={setActive} />
        <Link to={`/planning/${metro.name}`}>
          <Button text="일정 만들기" />
        </Link>
      </div>
    </div>
  );
};

export default MetroModal;
