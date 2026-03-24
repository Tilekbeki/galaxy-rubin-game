import styles from './Hammer.module.css';

const Hammer = ({ state = 'initial' }) => {
    const getHammerClass = () => {
        switch(state) {
            case 'in-game':
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