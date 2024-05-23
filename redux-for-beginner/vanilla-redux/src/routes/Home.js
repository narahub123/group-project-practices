import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToDo, deleteToDo } from "../store";
import { Link } from "react-router-dom";

const Home = () => {
  const [text, setText] = useState("");

  const toDos = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(toDos);
  console.log(dispatch);
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(addToDo(text));
    setText("");
  };

  const onClick = (id) => {
    dispatch(deleteToDo(id));
  };
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => {
          return (
            <li>
              <Link to={`/${toDo.id}`}>
                {toDo.text}{" "}
                <button onClick={(id) => onClick(toDo.id)}>DEL</button>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
