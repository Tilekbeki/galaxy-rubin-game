import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentValue: 0,
};

const scaleSlice = createSlice({
  name: "scale",
  initialState,
  reducers: {
    startScaleMovement: (state) => {
      state.currentValue = 0;
    },
    setMove: (state) => {
      state.isMoving = true;
    },
    updateScaleValue: (state, action) => {
      state.currentValue = Math.min(100, Math.max(0, action.payload));
    },
    setScaleValue: (state, action) => {
      state.currentValue = action.payload;
    },
    setScaleSpeed: (state, action) => {
      state.speed = action.payload;
    },
    resetScale: (state) => {
      state.currentValue = 0;
    },
  },
});

export const {
  startScaleMovement,
  stopScaleMovement,
  updateScaleValue,
  setScaleValue,
  setScaleSpeed,
  resetScale,
} = scaleSlice.actions;
export default scaleSlice.reducer;
