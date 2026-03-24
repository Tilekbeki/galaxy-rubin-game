import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  levels: [
    { id: 7, isHit: false, height: 16 }, // верхний - красный
    { id: 6, isHit: false, height: 23 }, // светло-красный
    { id: 5, isHit: false, height: 28 }, // оранжевый
    { id: 4, isHit: false, height: 33 }, // желтый
    { id: 3, isHit: false, height: 38 }, // светло-зеленый
    { id: 2, isHit: false, height: 43 }, // зеленый
    { id: 1, isHit: false, height: 48 }, // нижний - темно-зеленый
  ],
  totalLevels: 7,
  filledLevels: 0, // теперь считаем сколько уровней заполнено
};

const measureSlice = createSlice({
  name: "measure",
  initialState,
  reducers: {
    fillLevelsByValue: (state, action) => {
      const value = action.payload; // 0-100%
      const levelsToFill = Math.floor((value / 100) * state.totalLevels);

      state.levels = state.levels.map((level, index) => ({
        ...level,
        isHit: index >= state.totalLevels - levelsToFill,
      }));

      // 🟢 обновляем filledLevels
      state.filledLevels = state.levels.filter((l) => l.isHit).length;
    },
    resetLevels: (state) => {
      state.levels = state.levels.map((level) => ({ ...level, isHit: false }));
      state.filledLevels = 0; // сбрасываем счетчик
    },
    setLevelHit: (state, action) => {
      const { levelId, isHit } = action.payload;
      const level = state.levels.find((l) => l.id === levelId);
      if (level) {
        level.isHit = isHit;
      }

      // 🟢 пересчитываем filledLevels
      state.filledLevels = state.levels.filter((l) => l.isHit).length;
    },
  },
});

export const { fillLevelsByValue, resetLevels, setLevelHit } =
  measureSlice.actions;
export default measureSlice.reducer;
