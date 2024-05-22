import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// reducer is a function that modifies the data
// change the data
// return value is the value of the application
const countReducer = (state = 0) => {
  // code for modifying the state
  // ...
  return state;
};

// store is a place where you store data
const countStore = createStore(countReducer);

console.log(countStore.getState());
