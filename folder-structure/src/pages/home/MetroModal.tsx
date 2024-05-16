import React from "react";
import { MetroType } from "../../data/metro";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import "./metroModal.css";

interface MetroModalProps {
  metro: MetroType;
  setActive?: (value: boolean) => void;
}

const MetroModal = ({ metro, setActive }: MetroModalProps) => {
  return (
    <div className="metroModal">
      <div
        className="background"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          const target = e.target as HTMLDivElement;
          const className = target.className;

          className === "background" && setActive && setActive(false);
        }}
      >
        <div className="container">
          <div className="expl">
            <span className="desc">
              <p className="name">{metro.name}</p>
              <p className="description">{metro.description}</p>
            </span>
            <img src={metro.imgUrl} alt={metro.name} />
          </div>
          <div className="buttons">
            <Button text="이전" setActive={setActive} />
            <Link to={`/planning/${metro.name}`}>
              <Button text="일정 만들기" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetroModal;
