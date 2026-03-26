import { useSelector } from 'react-redux';
import styles from './MeasureBar.module.css';
import MeasureLevels from '../MeasureLevels';
import Rubin from '../Rubin';

const MeasureBar = ({ isWin = false }) => {
  const levels = useSelector((state) => state.measure.filledLevels);

  return (
    <div className={styles['measure-bar']}>
      <div
        className={`${styles['measure-bar-header']} ${isWin ? styles['measure-bar-header--win'] : ''}`}
      >
        <Rubin isWin={levels === 7} />
      </div>
      <MeasureLevels />
    </div>
  );
};

export default MeasureBar;
