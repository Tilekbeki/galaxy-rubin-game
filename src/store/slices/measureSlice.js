import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  levels: [
    { id: 7, isHit: false, height: 16 },
    { id: 6, isHit: false, height: 23 },
    { id: 5, isHit: false, height: 28 },
    { id: 4, isHit: false, height: 33 },
    { id: 3, isHit: false, height: 38 },
    { id: 2, isHit: false, height: 43 },
    { id: 1, isHit: false, height: 50 },
  ],
  totalLevels: 7,
  filledLevels: 0,
};

const measureSlice = createSlice({
  name: 'measure',
  initialState,
  reducers: {
    fillLevelsByValue: (state, action) => {
      const value = action.payload;

      const levelsToFill =
        value >= 95 ? state.totalLevels : Math.round((value / 100) * state.totalLevels);

      state.levels = state.levels.map((level, index) => ({
        ...level,
        isHit: index >= state.totalLevels - levelsToFill,
      }));

      state.filledLevels = levelsToFill;
    },
    resetLevels: (state) => {
      state.levels = state.levels.map((level) => ({ ...level, isHit: false }));
      state.filledLevels = 0;
    },
    setLevelHit: (state, action) => {
      const { levelId, isHit } = action.payload;
      const level = state.levels.find((l) => l.id === levelId);
      if (level) {
        level.isHit = isHit;
      }

      state.filledLevels = state.levels.filter((l) => l.isHit).length;
    },
  },
});

export const { fillLevelsByValue, resetLevels, setLevelHit } = measureSlice.actions;
export default measureSlice.reducer;
