import { useSelector } from 'react-redux';

import styles from './Rubin.module.css';

const Rubin = () => {
  const filledLevels = useSelector((state) => state.measure.filledLevels);
  const totalLevels = useSelector((state) => state.measure.totalLevels);

  const isWin = filledLevels === totalLevels;

  return (
    <div className={`${styles.prize} ${isWin ? styles.win : ''}`}>
      <div className={styles.glowLayer2} />
      <div className={styles.rubin} />
    </div>
  );
};

export default Rubin;