import { useSelector } from 'react-redux';


import MeasureLevels from '../MeasureLevels';
import Rubin from '../Rubin';

import styles from './MeasureBar.module.css';

const MeasureBar = () => {
  const filledLevels = useSelector((state) => state.measure.filledLevels);
  const totalLevels = useSelector((state) => state.measure.totalLevels);

  const isWinLocal = filledLevels === totalLevels;

  return (
    <div className={styles['measure-bar']}>
      <div
        className={`${styles['measure-bar-header']} ${
          isWinLocal ? styles['measure-bar-header--win'] : ''
        }`}
      >
        <Rubin isWin={isWinLocal} />
      </div>

      <MeasureLevels />
    </div>
  );
};

export default MeasureBar;
