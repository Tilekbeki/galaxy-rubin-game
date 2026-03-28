import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentValue: 0,
};

const scaleSlice = createSlice({
  name: 'scale',
  initialState,
  reducers: {
    setScaleValue: (state, action) => {
      state.currentValue = action.payload;
    },
    resetScale: (state) => {
      state.currentValue = 0;
    },
  },
});

export const { setScaleValue, resetScale } = scaleSlice.actions;
export default scaleSlice.reducer;
