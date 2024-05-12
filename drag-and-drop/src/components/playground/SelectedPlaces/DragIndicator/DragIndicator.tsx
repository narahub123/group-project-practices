import React from "react";
import "./dragIndicator.css";

interface Props {
  onDragEnter: React.DragEventHandler<HTMLDivElement>;
  onDragLeave: React.DragEventHandler<HTMLDivElement>;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onDrop: React.DragEventHandler<HTMLDivElement>;
  id: number;
  ariaLabel: number;
  active: boolean;
}

const DragIndicator = ({
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  id,
  ariaLabel,
  active,
}: Props) => {
  // console.log(id);
  // console.log(ariaLabel);

  return (
    <div
      className={
        id === ariaLabel && active ? "dragIndicator active" : "dragIndicator"
      }
      aria-label={id.toString()}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <p></p>
    </div>
  );
};

export default DragIndicator;
