import React from "react";
import { LuSiren } from "react-icons/lu";

const Button = () => {
  const handleClick = async () => {
    await fetch("http://localhost:3000/click", {
      method: "POST",
    });
  };

  return (
    <div>
      <button onClick={handleClick}>
        <LuSiren />
      </button>
    </div>
  );
};

export default Button;
