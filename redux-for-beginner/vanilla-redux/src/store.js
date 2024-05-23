import { createStore } from "redux";
import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

export const addToDo = createAction("ADD");
export const deleteToDo = createAction("DELETE");

console.log(addToDo(), deleteToDo()); // {type: , payload: {}}

const reducer = createReducer([], (builder) => {
  builder
    .addCase(addToDo, (state, action) => {
      state.unshift({ text: action.payload, id: Date.now() }); // mutate state, no return
    })
    .addCase(
      deleteToDo,
      (state, action) => state.filter((toDo) => toDo.id !== action.payload) // return new state,  immutable
    );
});

const store = configureStore({ reducer });

export default store;
