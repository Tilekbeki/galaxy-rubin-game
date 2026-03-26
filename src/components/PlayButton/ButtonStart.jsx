import styles from './PlayButton.module.css';
import { useSelector } from 'react-redux';

const PlayButton = ({ text, onClick }) => {
  const gameStatus = useSelector((state) => state.game.gameStatus);

  return (
    <button
      className={`${styles.button} ${gameStatus === 'ingame' ? styles['button--active'] : null}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PlayButton;
