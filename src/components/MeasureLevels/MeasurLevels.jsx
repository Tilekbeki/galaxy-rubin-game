import { useSelector } from 'react-redux';

import styles from './MeasureLevels.module.css';

const MeasureLevels = () => {
  const levels = useSelector((state) => state.measure.levels);

  return (
    <div className={styles['measure-levels']}>
      {levels.map((level) => (
        <div
          key={level.id}
          className={`${styles['level-item']} ${styles[`level-item--${level.id}`]}`}
        >
          <div
            className={`
              ${styles.level}
              ${styles[`level--${level.id}`]}
              ${level.isHit ? styles.hit : ''}
            `}
          />
        </div>
      ))}
    </div>
  );
};

export default MeasureLevels;