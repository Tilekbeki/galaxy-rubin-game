import { useSelector } from 'react-redux';

import { ROBOT_STATE } from '../../constants/gameStatus';

import styles from './Robot.module.css';

const Robot = () => {
  const robotState = useSelector((state) => state.game.robotState);

  const getRobotClass = () => {
    switch (robotState) {
      case ROBOT_STATE.BEFORE:
        return styles['robot-before'];
      case ROBOT_STATE.INGAME:
        return styles['robot-ingame'];
      case ROBOT_STATE.PUNCHED:
        return styles['robot-punched'];
      case ROBOT_STATE.WIN:
        return styles['robot-win'];
      default:
        return styles['robot-before'];
    }
  };

  return (
    <div className={styles['robot-place']}>
      <div className={`${styles.robot} ${getRobotClass()}`} />
    </div>
  );
};

export default Robot;
