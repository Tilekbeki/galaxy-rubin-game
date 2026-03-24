import { useState, useEffect, useRef } from 'react';
import styles from './PushButton.module.css';
import buttonActive from '../../assets/button_active.png';
import buttonNormal from '../../assets/button.png';
import { useSelector } from 'react-redux';

const PushButton = ({ onPunch, disabled = false, holdDelay = 3000 }) => { // 👈 изменено с 300 на 3000
    const [isPressed, setIsPressed] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const harmerState = useSelector((state) => state.game.hammerState);
    
    const holdTimeoutRef = useRef(null);
    const isPunchExecutedRef = useRef(false);

    useEffect(() => {
        const preloadImages = async () => {
            const images = [buttonActive, buttonNormal];
            const promises = images.map((src) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            });
            await Promise.all(promises);
            setImagesLoaded(true);
        };

        preloadImages();
    }, []);

useEffect(() => {
    if (harmerState === 'punched') {
        // Задержка перед сбросом нажатого состояния
        const timeoutId = setTimeout(() => {
            setIsPressed(true);
        }, 1000); // Небольшая задержка для плавности
        
        return () => clearTimeout(timeoutId);
    }
    
    if (harmerState === 'initial') {
       setIsPressed(false);
            isPunchExecutedRef.current = false;
        
    }
}, [harmerState]);

    const handleMouseDown = () => {
        if (!disabled && harmerState !== 'punched') {
            
            isPunchExecutedRef.current = false;
            
            console.log('🔘 Кнопка нажата, удерживайте 3 секунды...');
            
            // Задержка перед ударом 3 секунды
            holdTimeoutRef.current = setTimeout(() => {
                if (isPressed && !isPunchExecutedRef.current) {
                    setIsPressed(true);
                    isPunchExecutedRef.current = true;
                    console.log('💥 Удар! Прошло 3 секунды');
                    onPunch?.();
                }
            }, holdDelay); // 3000 мс = 3 секунды
        }
    };

    const handleMouseUp = () => {
        if (holdTimeoutRef.current) {
            clearTimeout(holdTimeoutRef.current);
            console.log('❌ Удар отменен, кнопка отпущена раньше 3 секунд');
        }
        
        if (!isPunchExecutedRef.current) {
            setIsPressed(false);
        }
    };

    const handleMouseLeave = () => {
        if (holdTimeoutRef.current) {
            clearTimeout(holdTimeoutRef.current);
            console.log('❌ Удар отменен, курсор покинул кнопку');
        }
        setIsPressed(false);
        isPunchExecutedRef.current = false;
    };

    if (!imagesLoaded) {
        return <div className={styles['push-button']} />;
    }

    return (
        <div 
            className={`${styles['push-button']} ${disabled ? styles['push-button--disabled'] : ''}`}
            onMouseDown={disabled ? undefined : handleMouseDown}
            onMouseUp={disabled ? undefined : handleMouseUp}
            onMouseLeave={disabled ? undefined : handleMouseLeave}
            style={{
                backgroundImage: `url(${isPressed ? buttonActive : buttonNormal})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
                pointerEvents: disabled ? 'none' : 'auto'
            }}
        />
    );
};

export default PushButton;