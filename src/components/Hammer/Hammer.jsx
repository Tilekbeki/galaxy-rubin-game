import { useSelector } from 'react-redux';

import { HAMMER_STATE } from '../../constants/gameStatus';

import styles from './Hammer.module.css';

const Hammer = () => {
  const { hammerState } = useSelector((state) => state.game);

  const getHammerClass = () => {
    switch (hammerState) {
      case HAMMER_STATE.INGAME:
        return `${styles.hammer} ${styles['hammer--in-game']}`;
      case HAMMER_STATE.PUNCHED:
        return `${styles.hammer} ${styles['hammer--punched']}`;
      default:
        return styles.hammer;
    }
  };

  return <div className={getHammerClass()} />;
};

export default Hammer;
