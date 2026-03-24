import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import GameScene from "../GameScene/";

import {
  startGame,
  punch,
  winGame,
  failGame,
  resetGame,
} from "../../store/slices/gameSlice";

import {
  startScaleMovement,
  stopScaleMovement,
  updateScaleValue,
  resetScale,
} from "../../store/slices/scaleSlice";

import { fillLevelsByValue, resetLevels } from "../../store/slices/measureSlice";

const GameContainer = () => {
  const dispatch = useDispatch();
  const animationRef = useRef(null);

  const {
    gameStatus,
    hammerState,
    canPunch,
    showResult,
    punchResult,
    robotState,
  } = useSelector((state) => state.game);

  // ===== АНИМАЦИЯ =====
  useEffect(() => {
    if (gameStatus === "ingame") {
      const animate = () => {
        dispatch(updateScaleValue());
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [gameStatus, dispatch]);

  // ===== РЕЗУЛЬТАТ =====
  useEffect(() => {
    if (showResult && punchResult !== null) {
      dispatch(fillLevelsByValue(punchResult));

      const timer = setTimeout(() => {
        dispatch(punchResult >= 90 ? winGame() : failGame());
        dispatch(stopScaleMovement());
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [showResult, punchResult, dispatch]);

  // ===== ACTION HANDLER =====
  const handleAction = () => {
    if (gameStatus === "before") {
      dispatch(startGame());
      dispatch(startScaleMovement());
      dispatch(resetLevels());
      dispatch(resetScale());
    }

    if (gameStatus === "ingame" && canPunch) {
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
      hammerState={hammerState}
      robotState={robotState}
      buttonText={buttonTextMap[gameStatus]}
      onAction={handleAction}
    />
  );
};

export default GameContainer;