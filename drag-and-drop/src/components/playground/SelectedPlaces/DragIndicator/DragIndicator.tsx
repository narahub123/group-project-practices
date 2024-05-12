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
  dataColumn: number;
  column: number;
}

const DragIndicator = ({
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  id,
  ariaLabel,
  active,
  dataColumn,
  column,
}: Props) => {
  // console.log(id);
  // console.log(ariaLabel);

  return (
    <div
      className={
        dataColumn === column && id === ariaLabel && active
          ? "dragIndicator active"
          : "dragIndicator"
      }
      aria-label={id.toString()}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      data-column={dataColumn}
    >
      <p></p>
    </div>
  );
};

export default DragIndicator;
