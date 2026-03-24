import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameStatus: "before",
  robotState: "before",
  hammerState: "initial",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state) => {
      state.gameStatus = "ingame";
      state.robotState = "ingame";
      state.hammerState = "ingame";
    },
    punch: (state) => {
      if (state.gameStatus === "ingame") {
        state.hammerState = "punched";
        state.robotState = "punched";
      }
    },
    winGame: (state) => {
      state.gameStatus = "win";
      state.robotState = "win";
    },
    failGame: (state) => {
      state.gameStatus = "fail";
      state.robotState = "before";
    },
    resetGame: (state) => {
      return initialState;
    },
    setRobotState: (state, action) => {
      state.robotState = action.payload;
    },
  },
});

export const { startGame, punch, winGame, failGame, resetGame, setRobotState } =
  gameSlice.actions;
export default gameSlice.reducer;
