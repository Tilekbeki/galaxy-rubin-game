
import Robot from '../Robot';
import PlayButton from '../PlayButton';
import TextPreview from '../TextPreview';
import Scale from '../Scale';
import MeasureBar from '../MeasureBar';
import PushButton from '../PushButton';
import Hammer from '../Hammer';
import { GAME_STATUS, ROBOT_STATE } from '../../constants/gameStatus';

import styles from './GameScene.module.css';

const GameScene = ({ gameStatus, robotState, buttonText, onAction, onPunch }) => {
  const isHidden = robotState === ROBOT_STATE.PUNCHED;

  return (
    <div className={styles.container}>
      <MeasureBar/>
      <PushButton  />
      <Hammer />

      <div className={styles.controllers}>
        <Scale onPunch={onPunch} />

        <div
          className={`${styles['interactive-block']}
            ${isHidden ? styles['interactive-block-hidden'] : ''}
            ${gameStatus === GAME_STATUS.WIN ? styles['interactive-block-win'] : ''}
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
