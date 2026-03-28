import { useSelector } from 'react-redux';

import GameScene from "../GameScene";
import { useGameLogic } from '../../hooks/useGameLogic';

const GameContainer = () => {
  const { gameStatus, buttonText, handleAction,handlePunch } = useGameLogic();

  const robotState = useSelector((state) => state.game.robotState);

  return (
    <GameScene
      gameStatus={gameStatus}
      robotState={robotState}
      buttonText={buttonText}
      onAction={handleAction}
      onPunch = {handlePunch}
    />
  );
};

export default GameContainer;