import { createStore } from "redux";
import {
  configureStore,
  createAction,
  createReducer,
  createSlice,
} from "@reduxjs/toolkit";

const toDoSlice = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.unshift({ text: action.payload, id: Date.now() }); // mutate state, no return
    },
    remove: (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload),
  },
});

console.log(toDoSlice.reducer);
const store = configureStore({ reducer: toDoSlice.reducer });

console.log(toDoSlice.actions);
export const { add, remove } = toDoSlice.actions;

export default store;
