import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Robot from "./components/Robot/";
import PlayButton from "./components/PlayButton";
import TextPreview from "./components/TextPreview";
import Scale from "./components/Scale";
import MeasureBar from "./components/MeasureBar/";
import PushButton from "./components/PushButton";
import Hammer from "./components/Hammer";
import {
  startGame,
  punch,
  winGame,
  failGame,
  resetGame,
} from "./store/slices/gameSlice";
import {
  startScaleMovement,
  stopScaleMovement,
  updateScaleValue,
  resetScale,
} from "./store/slices/scaleSlice";
import { fillLevelsByValue, resetLevels } from "./store/slices/measureSlice";

function App() {
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
  const { currentValue, isMoving } = useSelector((state) => state.scale);

  // ===== Анимация шкалы =====
  useEffect(() => {
    if (gameStatus === "ingame" && isMoving) {
      const animate = () => {
        dispatch(updateScaleValue());
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [gameStatus, isMoving, dispatch]);

  // ===== Показ результата после удара =====
  useEffect(() => {
    if (showResult && punchResult !== null) {
      dispatch(fillLevelsByValue(punchResult));

      setTimeout(() => {
        if (punchResult >= 90) {
          dispatch(winGame());
        } else {
          dispatch(failGame());
        }
        dispatch(stopScaleMovement());
      }, 500);
    }
  }, [showResult, punchResult, dispatch]);

  // ===== Хэндлеры =====
  const handleStartGame = () => {
    dispatch(startGame());
    dispatch(startScaleMovement());
    dispatch(resetLevels());
    dispatch(resetScale());
  };

  const handlePunch = () => {
    if (gameStatus === "ingame" && canPunch) {
      dispatch(punch());
    }
  };

  const handleResetGame = () => {
    dispatch(resetGame());
    dispatch(resetLevels());
    dispatch(resetScale());
  };

  // ===== Текст и действие кнопки =====
  const getButtonText = () => {
    if (gameStatus === "before") return "Начать игру";
    if (gameStatus === "ingame") return "УДАР!";
    if (gameStatus === "win" || gameStatus === "fail") return "Играть снова";
    return "УДАР!";
  };

  const getButtonAction = () => {
    if (gameStatus === "before") return handleStartGame;
    if (gameStatus === "ingame") return handlePunch;
    if (gameStatus === "win" || gameStatus === "fail") return handleResetGame;
    return () => {};
  };

  // ===== Управление видимостью интерактива =====
  const isInteractiveHidden = robotState === "punched"; // скрываем, если робот в состоянии "punched"
  const gapStyle = gameStatus === "win" ? { gap: "1px" } : {};

  return (
    <div className="App">
      <div className="App-container">
        <MeasureBar isWin={gameStatus === "win"} />
        <PushButton />
        <Hammer state={hammerState} />
        <div className="controllers">
          <Scale value={currentValue} />
          <div
            className={`App-interactive-block ${isInteractiveHidden ? "App-interactive-block--hidden" : ""}`}
            style={gapStyle}
          >
            <TextPreview gameStatus={gameStatus} />
            <PlayButton text={getButtonText()} onClick={getButtonAction()} />
          </div>
          <Robot state={robotState} />
        </div>
      </div>
    </div>
  );
}

export default App;
