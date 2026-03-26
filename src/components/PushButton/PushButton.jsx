import { useState, useEffect, useRef } from 'react';
import styles from './PushButton.module.css';
import buttonActive from '../../assets/button_active.png';
import buttonNormal from '../../assets/button.png';
import { useSelector } from 'react-redux';

const PushButton = ({ onPunch, disabled = false }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const harmerState = useSelector((state) => state.game.hammerState);

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
      const timeoutId = setTimeout(() => {
        setIsPressed(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }

    if (harmerState === 'initial') {
      setIsPressed(false);
      isPunchExecutedRef.current = false;
    }
  }, [harmerState]);

  if (!imagesLoaded) {
    return <div className={styles['push-button']} />;
  }

  return (
    <div
      className={`${styles['push-button']} ${disabled ? styles['push-button--disabled'] : ''}`}
      style={{
        backgroundImage: `url(${isPressed ? buttonActive : buttonNormal})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        pointerEvents: disabled ? 'none' : 'auto',
      }}
    />
  );
};

export default PushButton;
