import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { fillLevelsByValue, resetLevels } from '../../store/slices/measureSlice';
import { setScaleValue } from '../../store/slices/scaleSlice';

import styles from './Scale.module.css';

const Scale = () => {
    const dispatch = useDispatch();
    const maxHeight = 139;

    // Redux
    const gameStatus = useSelector(state => state.game.gameStatus); // before, ingame, win, fail
    const hammerState = useSelector(state => state.game.hammerState); // initial, ingame, punched

    const [height, setHeight] = useState(0);
    const directionRef = useRef(1);
    const intervalRef = useRef(null);

    // ===== Движение шкалы =====
    useEffect(() => {
        if (gameStatus === 'before') {
            setHeight(0);
            directionRef.current = 1;
            clearInterval(intervalRef.current);
            return;
        }

        if (hammerState === 'ingame') {
            intervalRef.current = setInterval(() => {
                setHeight(prev => {
                    let next = prev + directionRef.current * 5;

                    if (next >= maxHeight) {
                        next = maxHeight;
                        directionRef.current = -1;
                    } else if (next <= 0) {
                        next = 0;
                        directionRef.current = 1;
                    }

                    return next;
                });
            }, 200);
        }

        return () => clearInterval(intervalRef.current);
    }, [gameStatus, hammerState]);

    // ===== Удар =====
useEffect(() => {
    if (hammerState === 'punched') {
        // создаём таймер на 2 секунды
        const timer = setTimeout(() => {
            const percent = Math.round((height / maxHeight) * 100);

            // сохраняем процент
            dispatch(setScaleValue(height));
            dispatch(fillLevelsByValue(height));
        }, 1000); // задержка 2000мс = 2 сек

        // очистка таймера при размонтировании или изменении зависимостей
        return () => clearTimeout(timer);
    }
}, [hammerState, height, dispatch]);

    // ===== Градиент шкалы =====
    const getGradient = () => {
        const percent = (height / maxHeight) * 100;
        return 'linear-gradient(180deg, #00d355 0%, #88ff88 100%)';
    };

    // ===== Вычисляем bottom для псевдоэлемента =====
    const afterBottom = -1 + height; // смещение белой полоски вверх вместе с высотой

    return (
        <div className={styles.scale}>
            <div className={styles['scale-lines']} />

            <div
                className={styles['scale-energy']}
                style={{
                    height: `${height}px`,
                    background: getGradient(),
                    transition: 'height 0.05s linear',
                    '--after-bottom': `${afterBottom}px` // передаем в CSS переменную
                }}
            />

            <div className={styles['scale-white-half']} />
        </div>
    );
};

export default Scale;