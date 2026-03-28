import styles from './Rubin.module.css';

const Rubin = ({ isWin = false }) => {
  return (
    <div className={`${styles.prize} ${isWin ? styles.win : ''}`}>
      <div className={styles.glowLayer2} />
      <div className={styles.rubin} />
    </div>
  );
};

export default Rubin;
