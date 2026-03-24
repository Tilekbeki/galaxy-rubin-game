import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { fillLevelsByValue } from '../../store/slices/measureSlice';
import { setScaleValue } from '../../store/slices/scaleSlice';

import styles from './Scale.module.css';

const Scale = () => {
    const dispatch = useDispatch();
    const maxHeight = 139;

    const gameStatus = useSelector(state => state.game.gameStatus);
    const hammerState = useSelector(state => state.game.hammerState);

    const [height, setHeight] = useState(0);

    const directionRef = useRef(1);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);
    const isHandledRef = useRef(false); 

    useEffect(() => {
        clearInterval(intervalRef.current);

        if (gameStatus === 'before') {
            setHeight(0);
            directionRef.current = 1;
            return;
        }

        if (hammerState === 'ingame') {
            const step = Math.max(1, Math.floor(maxHeight / 20));

intervalRef.current = setInterval(() => {
    setHeight(prev => {
        let next = prev + directionRef.current * step;

        if (next >= maxHeight) {
            next = maxHeight;
            directionRef.current = -1;
        } else if (next <= 0) {
            next = 0;
            directionRef.current = 1;
        }

        return next;
    });
            }, 100);
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [gameStatus, hammerState]);

    useEffect(() => {
        if (hammerState !== 'punched') {
            isHandledRef.current = false;
            return;
        }

        if (isHandledRef.current) return;

        isHandledRef.current = true;

        timeoutRef.current = setTimeout(() => {
            const percent = Math.round((height / maxHeight) * 100);

            dispatch(setScaleValue(percent));
            dispatch(fillLevelsByValue(percent));
        }, 1000);

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [hammerState, dispatch,height]); 

    const afterBottom = -1 + height;

    return (
        <div className={styles.scale}>
            <div className={styles['scale-lines']} />

            <div
                className={styles['scale-energy']}
                style={{
                    height: `${height}px`,
                    background: 'linear-gradient(180deg, #00d355 0%, #88ff88 100%)',
                    transition: 'height 0.05s linear',
                    '--after-bottom': `${afterBottom}px`
                }}
            />

            <div className={styles['scale-white-half']} />
        </div>
    );
};

export default Scale;