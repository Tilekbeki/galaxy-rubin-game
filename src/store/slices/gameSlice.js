import { createSlice } from '@reduxjs/toolkit';

import { GAME_STATUS, HAMMER_STATE, ROBOT_STATE } from '../../constants/gameStatus';

const initialState = {
  gameStatus: GAME_STATUS.BEFORE,
  robotState: ROBOT_STATE.BEFORE,
  hammerState: HAMMER_STATE.INITIAL,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.gameStatus = GAME_STATUS.INGAME;
      state.robotState = ROBOT_STATE.INGAME;
      state.hammerState = HAMMER_STATE.INGAME;
    },
    punch: (state) => {
      if (state.gameStatus === GAME_STATUS.INGAME) {
        state.hammerState = HAMMER_STATE.PUNCHED;
        state.robotState = ROBOT_STATE.PUNCHED;
      }
    },
    winGame: (state) => {
      state.gameStatus = GAME_STATUS.WIN;
      state.robotState = ROBOT_STATE.WIN;
    },
    failGame: (state) => {
      state.gameStatus = GAME_STATUS.FAIL;
      state.robotState = ROBOT_STATE.BEFORE;
    },
    resetGame: () => initialState,
    setRobotState: (state, action) => {
      state.robotState = action.payload;
    },
  },
});

export const { startGame, punch, winGame, failGame, resetGame, setRobotState } = gameSlice.actions;
export default gameSlice.reducer;
