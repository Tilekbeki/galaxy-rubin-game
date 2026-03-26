import { useSelector } from 'react-redux';
import styles from './TextPreview.module.css';

const TextPreview = () => {
  const gameStatus = useSelector((state) => state.game.gameStatus);

  const textByStatus = {
    before: (
      <p>
        Привет!
        <br />
        проверим твою силу!
      </p>
    ),
    ingame: <p>Жми на кнопку в нужный момент!</p>,
    win: (
      <p>
        ВОТ ЭТО СИЛА!
        <br />
        Ты выбил главный приз!
        <br />
        <span>Рубин</span>
      </p>
    ),
    fail: (
      <p>
        Неплохо!
        <br />
        Попробуй еще раз.
      </p>
    ),
  };

  return <div className={styles['text-preview']}>{textByStatus[gameStatus]}</div>;
};

export default TextPreview;
