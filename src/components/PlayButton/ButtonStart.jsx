import { useSelector } from 'react-redux';

import { GAME_STATUS } from '../../constants/gameStatus';

import styles from './PlayButton.module.css';

const PlayButton = ({ text, onClick }) => {
  const gameStatus = useSelector((state) => state.game.gameStatus);

  return (
    <button
      className={`${styles.button} ${gameStatus === GAME_STATUS.INGAME ? styles['button--active'] : null}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PlayButton;
