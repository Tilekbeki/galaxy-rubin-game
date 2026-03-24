import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameStatus: "before", // before, ingame, win, fail
  robotState: "before", // before, ingame, punched, win
  hammerState: "initial", // initial, in-game, punchstarted, punched
  showWinBlock: false,
  canPunch: true,
  punchResult: null,
  showResult: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state) => {
      state.gameStatus = "ingame";
      state.robotState = "ingame";
      state.hammerState = "ingame";
      state.showWinBlock = false;
      state.canPunch = true;
      state.punchResult = null;
      state.showResult = false;
    },
    punch: (state) => {
      if (state.canPunch && state.gameStatus === "ingame") {
        state.hammerState = "punched";
        state.robotState = "punched";
        state.canPunch = false;
      }
    },
    punchComplete: (state, action) => {
      state.hammerState = "ingame";
      state.punchResult = action.payload;
      state.showResult = true;
    },
    winGame: (state) => {
      state.gameStatus = "win";
      state.robotState = "win";
      state.showWinBlock = true;
      state.canPunch = false;
    },
    failGame: (state) => {
      state.gameStatus = "fail";
      state.robotState = "before";
      state.showWinBlock = true;
      state.canPunch = false;
    },
    resetGame: (state) => {
      return initialState;
    },
    setRobotState: (state, action) => {
      state.robotState = action.payload;
    },
  },
});

export const {
  startGame,
  punch,
  punchComplete,
  winGame,
  failGame,
  resetGame,
  setRobotState,
} = gameSlice.actions;
export default gameSlice.reducer;
