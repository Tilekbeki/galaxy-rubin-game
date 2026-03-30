import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startGame, punch, winGame, failGame, resetGame } from '../store/slices/gameSlice';
import { resetScale, setScaleValue } from '../store/slices/scaleSlice';
import { fillLevelsByValue, resetLevels } from '../store/slices/measureSlice';
import { GAME_STATUS, HAMMER_STATE } from '../constants/gameStatus';

export const useGameLogic = () => {
  const dispatch = useDispatch();

  const currentValue = useSelector((state) => state.scale.currentValue);
  const filledLevels = useSelector((state) => state.measure.filledLevels);
  const totalLevels = useSelector((state) => state.measure.totalLevels);

  const { gameStatus, hammerState } = useSelector((state) => state.game);

  useEffect(() => {
    if (hammerState !== HAMMER_STATE.PUNCHED) return;
    dispatch(setScaleValue(currentValue));
    dispatch(fillLevelsByValue(currentValue));

    const timer = setTimeout(() => {
      const allLevelsFilled = filledLevels === totalLevels;
      const isWin = allLevelsFilled;

      dispatch(isWin ? winGame() : failGame());
    }, 1000);

    return () => clearTimeout(timer);
  }, [hammerState, currentValue, dispatch]);

  const handlePunch = (percent) => {
    dispatch(setScaleValue(percent));
    dispatch(fillLevelsByValue(percent));
  };

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
