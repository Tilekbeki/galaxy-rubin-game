import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentValue: 0, // 0-100%
  targetValue: 0,
  isMoving: false,
  isScaleStoped: false,
};

const scaleSlice = createSlice({
  name: "scale",
  initialState,
  reducers: {
    startScaleMovement: (state) => {
      state.isMoving = true;
      state.currentValue = 0;
      state.direction = "up";
      state.isAnimating = true;
      console.log("📈 Шкала начала движение вверх");
    },
    setMove: (state) => {
      state.isMoving = true;
    },
    stopScaleMovement: (state) => {
      state.isMoving = false;
      state.isAnimating = false;
      console.log("⏹️ Движение шкалы остановлено");
    },
    updateScaleValue: (state) => {
      if (!state.isMoving) return;

      if (state.direction === "up") {
        state.currentValue += state.speed;
        if (state.currentValue >= 100) {
          state.currentValue = 100;
          state.direction = "down";
          console.log("📉 Шкала достигла максимума, начинает движение вниз");
        }
      } else {
        state.currentValue -= state.speed;
        if (state.currentValue <= 0) {
          state.currentValue = 0;
          state.direction = "up";
          console.log("📈 Шкала достигла минимума, начинает движение вверх");
        }
      }
    },
    setScaleValue: (state, action) => {
      const value = Math.round(action.payload); // ✅ округление

      state.currentValue = Math.min(100, Math.max(0, value));

      console.log(`🎯 Шкала установлена на ${state.currentValue}%`);
    },
    setScaleSpeed: (state, action) => {
      state.speed = action.payload;
      console.log(`⚡ Скорость шкалы изменена на ${state.speed}`);
    },
    resetScale: (state) => {
      state.currentValue = 0;
      state.isMoving = false;
      state.direction = "up";
      state.isAnimating = false;
      console.log("🔄 Шкала сброшена до 0%");
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
