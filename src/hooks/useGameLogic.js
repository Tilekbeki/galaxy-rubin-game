import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startGame, punch, winGame, failGame, resetGame } from '../store/slices/gameSlice';
import { resetScale, setScaleValue } from '../store/slices/scaleSlice';
import { fillLevelsByValue, resetLevels } from '../store/slices/measureSlice';
import { GAME_STATUS, HAMMER_STATE } from '../constants/gameStatus';

export const useGameLogic = () => {
  const dispatch = useDispatch();

  const currentValue = useSelector((state) => state.scale.currentValue);
  const { gameStatus, hammerState } = useSelector((state) => state.game);

  // 👉 ЕДИНАЯ логика удара
  useEffect(() => {
    if (hammerState !== HAMMER_STATE.PUNCHED) return;

    dispatch(fillLevelsByValue(currentValue));

    const timer = setTimeout(() => {
      dispatch(currentValue >= 95 ? winGame() : failGame());
    }, 1000);

    return () => clearTimeout(timer);
  }, [hammerState, currentValue, dispatch]);

  const handlePunch = (percent) => {
    dispatch(setScaleValue(percent));
    dispatch(fillLevelsByValue(percent));
  };
  // 👉 обработчик кнопки
  const handleAction = () => {
    switch (gameStatus) {
      case GAME_STATUS.BEFORE:
        dispatch(startGame());
        dispatch(resetLevels());
        dispatch(resetScale());
        break;

      case GAME_STATUS.INGAME:
        dispatch(punch());
        break;

      case GAME_STATUS.WIN:
      case GAME_STATUS.FAIL:
        dispatch(resetGame());
        dispatch(resetLevels());
        dispatch(resetScale());
        break;

      default:
        break;
    }
  };

  const buttonTextMap = {
    [GAME_STATUS.BEFORE]: 'НОВАЯ ИГРА',
    [GAME_STATUS.INGAME]: 'УДАР!',
    [GAME_STATUS.WIN]: 'НОВАЯ ИГРА',
    [GAME_STATUS.FAIL]: 'НОВАЯ ИГРА',
  };

  return {
    gameStatus,
    hammerState,
    buttonText: buttonTextMap[gameStatus],
    handlePunch,
    handleAction,
  };
};
