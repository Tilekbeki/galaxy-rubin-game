import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GameScene from "../GameScene/";

import {
  startGame,
  punch,
  winGame,
  failGame,
  resetGame,
} from "../../store/slices/gameSlice";

import { resetScale } from "../../store/slices/scaleSlice";
import { fillLevelsByValue, resetLevels } from "../../store/slices/measureSlice";

const GameContainer = () => {
  const dispatch = useDispatch();

  const currentValue = useSelector((state) => state.scale.currentValue);

  const { gameStatus, robotState, hammerState } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    if (hammerState !== "punched") return;

    dispatch(fillLevelsByValue(currentValue));

    const timer = setTimeout(() => {
      dispatch(currentValue >= 95 ? winGame() : failGame());
    }, 1000);

    return () => clearTimeout(timer);
  }, [hammerState, currentValue, dispatch]);

  const handleAction = () => {
    if (gameStatus === "before") {
      dispatch(startGame());
      dispatch(resetLevels());
      dispatch(resetScale());
    }

    if (gameStatus === "ingame") {
      dispatch(punch());
    }

    if (gameStatus === "win" || gameStatus === "fail") {
      dispatch(resetGame());
      dispatch(resetLevels());
      dispatch(resetScale());
    }
  };

  const buttonTextMap = {
    before: "Начать игру",
    ingame: "УДАР!",
    win: "Играть снова",
    fail: "Играть снова",
  };

  return (
    <GameScene
      gameStatus={gameStatus}
      robotState={robotState}
      buttonText={buttonTextMap[gameStatus]}
      onAction={handleAction}
    />
  );
};

export default GameContainer;