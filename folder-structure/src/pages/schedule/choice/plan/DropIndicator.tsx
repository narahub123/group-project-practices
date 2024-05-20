import React from "react";
import "./dropIndicator.css";

interface DropIndicatorProps {
  dataRow: string;
  dataCol: string;
  onDragEnter: React.DragEventHandler<HTMLDivElement>;
  onDragLeave: React.DragEventHandler<HTMLDivElement>;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onDrop: React.DragEventHandler<HTMLDivElement>;
}

const DropIndicator = ({
  dataRow,
  dataCol,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
}: DropIndicatorProps) => {
  return (
    <div
      className="dropIndicator"
      data-row={dataRow}
      data-column={dataCol}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <p className="separator"></p>
    </div>
  );
};

export default DropIndicator;
