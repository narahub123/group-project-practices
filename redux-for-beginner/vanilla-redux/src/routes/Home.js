import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../store";
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

    dispatch(add(text));
    setText("");
  };

  const onClick = (id) => {
    dispatch(remove(id));
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
            <li key={toDo.id}>
              <Link to={`/${toDo.id}`}>{toDo.text}</Link>
              <button onClick={(id) => onClick(toDo.id)}>DEL</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
