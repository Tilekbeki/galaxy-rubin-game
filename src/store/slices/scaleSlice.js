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
    updateScaleValue: (state) => {
      if (state.direction === "up") {
        state.currentValue += state.speed;
        if (state.currentValue >= 100) {
          state.currentValue = 100;
        }
      } else {
        state.currentValue -= state.speed;
        if (state.currentValue <= 0) {
          state.currentValue = 0;
        }
      }
    },
    setScaleValue: (state, action) => {
      const value = Math.round(action.payload);

      state.currentValue = Math.min(100, Math.max(0, value));
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
