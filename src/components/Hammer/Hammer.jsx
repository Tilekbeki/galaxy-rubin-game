import styles from './Hammer.module.css';
import { useSelector } from 'react-redux';

const Hammer = () => {
  const { hammerState } = useSelector((state) => state.game);

  const getHammerClass = () => {
    switch (hammerState) {
      case 'ingame':
        return `${styles.hammer} ${styles['hammer--in-game']}`;
      case 'punched':
        return `${styles.hammer} ${styles['hammer--punched']}`;
      default:
        return styles.hammer;
    }
  };

  return <div className={getHammerClass()}></div>;
};

export default Hammer;
