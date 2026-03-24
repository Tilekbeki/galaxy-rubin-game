import styles from './PlayButton.module.css';

const PlayButton = ({ text, onClick }) => {
    return (
        <button 
            className={`${styles.button} ${styles['button--active']}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default PlayButton;