import { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';

import { setRobotState, failGame, winGame } from '../../store/slices/gameSlice';

import styles from './MeasureLevels.module.css';

const MeasureLevels = () => {
  const levels = useSelector((state) => state.measure.levels);
  const dispatch = useDispatch();

  useEffect(() => {
    const filledCount = levels.filter((level) => level.isHit).length;

    if (filledCount > 0) {
      const timeoutId = setTimeout(() => {
        if (filledCount === 7) {
          dispatch(setRobotState('win'));
          dispatch(winGame());
        } else {
          dispatch(setRobotState('punched'));
          dispatch(failGame());
        }
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [levels, dispatch]);

  return (
    <div className={styles['measure-levels']}>
      {levels.map((level) => (
        <div
          key={level.id}
          className={`${styles['level-item']} ${styles[`level-item--${level.id}`]}`}
        >
          <div
            className={`${styles.level} ${styles[`level--${level.id}`]} ${level.isHit ? styles.hit : ''}`}
          />
        </div>
      ))}
    </div>
  );
};

export default MeasureLevels;
