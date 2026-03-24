import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import scaleReducer from "./slices/scaleSlice";
import measureReducer from "./slices/measureSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    scale: scaleReducer,
    measure: measureReducer,
  },
});
