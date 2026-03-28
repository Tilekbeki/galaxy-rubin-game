import { useScaleAnimation } from '../../hooks/useScaleAnimation';

import styles from './Scale.module.css';

const Scale = ({ onPunch }) => {
  const { energyRef } = useScaleAnimation({ onPunch });

  return (
    <div className={styles.scale}>
      <div className={styles['scale-lines']} />

      <div
        ref={energyRef}
        className={styles['scale-energy']}
      />

      <div className={styles['scale-white-half']} />
    </div>
  );
};

export default Scale;