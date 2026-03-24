import styles from './Robot.module.css';
import { useSelector } from 'react-redux';

const Robot = () => {
    const robotState = useSelector(state => state.game.robotState); 

    const getRobotClass = () => {
        switch(robotState) {
            case 'before':
                return styles['robot-before'];
            case 'ingame':
                return styles['robot-ingame'];
            case 'punched':
                return styles['robot-punched'];
            case 'win':
                return styles['robot-win'];
            default:
                return styles['robot-before'];
        }
    };

    return (
        <div className={styles['robot-place']}>
            <div className={`${styles.robot} ${getRobotClass()}`} />
        </div>
    );
};

export default Robot;