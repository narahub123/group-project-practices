import React from "react";

interface ButtonType {
  text: string;
  setActive?: (value: boolean) => void;
}

const Button = ({ text, setActive }: ButtonType) => {
  const handleClick = () => {
    setActive && setActive(false);
  };
  return <button onClick={handleClick}>{text}</button>;
};

export default Button;
