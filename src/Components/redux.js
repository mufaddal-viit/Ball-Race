//store:
// single source of truth. this stores everything for global state management.

//Action:
// a plain object describing what happened

//Reducer:
//A pure function that takes state and reducer and returns new state

// function counterReducer(state = 0, action) {
//   switch (action) {
//     case "INCREMENT": {
//       return state + 1;
//     }
//     case "DECREMENT": {
//       return state - 1;
//     }
//     default:
//       return state;
//   }
// }

//dispatch:
// used to send an action to the store
// dispatch({ type: "INCREMENT" });

//selector:
// Used to access a slice of state in your component.

// FLOW:
// Component
//     ↓ (dispatches)
//   Action → Reducer → Store → UI updates

import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
const initialState = { value: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementbyamount: (state, action) => {
      state.value = state.value + action.payload;
    },
  },
});
export const { increment, decrement, incrementbyamount } = counterSlice.actions;
// export default counterSlice.reducer;
// the above line means that we are exporting only this value and can be imported with any name

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
