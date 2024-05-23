import { createStore } from "redux";
import { createAction, createReducer } from "@reduxjs/toolkit";

export const addToDo = createAction("ADD");
export const deleteToDo = createAction("DELETE");

console.log(addToDo(), deleteToDo()); // {type: , payload: {}}

// const reducer = (state = [], action) => {
//   switch (action.type) {
//     case addToDo.type:
//       console.log(action);
//       return [{ text: action.payload, id: Date.now() }, ...state];
//     case deleteToDo.type:
//       console.log(action);
//       return state.filter((toDo) => toDo.id !== action.payload);
//     default:
//       return state;
//   }
// };

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

const store = createStore(reducer);

export default store;
