
import Robot from '../Robot';
import PlayButton from '../PlayButton';
import TextPreview from '../TextPreview';
import Scale from '../Scale';
import MeasureBar from '../MeasureBar';
import PushButton from '../PushButton';
import Hammer from '../Hammer';

import styles from './GameScene.module.css';

const GameScene = ({ gameStatus, robotState, buttonText, onAction }) => {
  const isHidden = robotState === 'punched';

  return (
    <div className={styles.container}>
      <MeasureBar isWin={gameStatus === 'win'} />
      <PushButton onPunch={onAction} />
      <Hammer />

      <div className={styles.controllers}>
        <Scale />

        <div
          className={`${styles['interactive-block']}
            ${isHidden ? styles['interactive-block-hidden'] : ''}
            ${gameStatus === 'win' ? styles['interactive-block-win'] : ''}
          `}
        >
          <TextPreview />
          <PlayButton text={buttonText} onClick={onAction} />
        </div>

        <Robot />
      </div>
    </div>
  );
};

export default GameScene;
