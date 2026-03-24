import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './MeasureLevels.module.css';
import { useDispatch } from 'react-redux';
import { setRobotState,failGame,winGame } from '../../store/slices/gameSlice';



const MeasureLevels = () => {
    const levels = useSelector(state => state.measure.levels);
const dispatch = useDispatch();
    
    
useEffect(() => {
    // Логируем заполнение уровней
    const filledCount = levels.filter(level => level.isHit).length;
    
    if (filledCount > 0) {
        console.log(`📊 Заполнено уровней: ${filledCount}/7`);
        
        // Задержка в 2 секунды перед обновлением состояния робота
        const timeoutId = setTimeout(() => {
            if (filledCount === 7) {
                dispatch(setRobotState("win"));
                dispatch(winGame());
            } else {
                dispatch(setRobotState("punched"));
                dispatch(failGame());
            }
        }, 1000); // 2 секунды задержки
        
        levels.forEach((level, index) => {
            if (level.isHit) {
                console.log(`  ✅ Уровень ${7-index}: заполнен (цвет: ${getLevelColor(level.id)})`);
            }
        });
        
        // Очищаем таймер при размонтировании или повторном вызове эффекта
        return () => clearTimeout(timeoutId);
    }
}, [levels]);
    
    const getLevelColor = (id) => {
        const colors = {
            1: 'темно-зеленый',
            2: 'зеленый',
            3: 'светло-зеленый',
            4: 'желтый',
            5: 'оранжевый',
            6: 'светло-красный',
            7: 'красный'
        };
        return colors[id] || 'неизвестно';
    };
    
    return (
        <div className={styles['measure-levels']}>
            {levels.map((level) => (
                <div 
                    key={level.id} 
                    className={`${styles['level-item']} ${styles[`level-item--${level.id}`]}`}
                >
                    <div 
                        className={`${styles['level']} ${styles[`level--${level.id}`]} ${level.isHit ? styles['hit'] : ''}`}
                    />
                </div>
            ))}
        </div>
    );
};

export default MeasureLevels;