import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteToDo } from "../store";

const Detail = () => {
  const { id } = useParams();

  const toDos = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toDo = toDos.find((item) => item.id === parseInt(id));
  console.log(id);
  console.log(toDo.text);

  const onClick = () => {
    console.log(id);
    dispatch(deleteToDo(parseInt(id)));
    navigate("/");
  };

  return (
    <>
      <h1>detail</h1>
      {toDo.text} <button onClick={onClick}>DEL</button>
    </>
  );
};

export default Detail;
