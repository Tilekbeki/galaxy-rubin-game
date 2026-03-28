import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import buttonActive from '../../assets/button_active.png';
import buttonNormal from '../../assets/button.png';
import { HAMMER_STATE } from '../../constants/gameStatus';

import styles from './PushButton.module.css';

const PushButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const hammerState  = useSelector((state) => state.game.hammerState);

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
    if (hammerState === HAMMER_STATE.PUNCHED) {
      const timeoutId = setTimeout(() => {
        setIsPressed(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }

    if (hammerState === HAMMER_STATE.INITIAL) {
      setIsPressed(false);
    }
  }, [hammerState]);

  if (!imagesLoaded) {
    return <div className={styles['push-button']} />;
  }

  return (
    <div
      className={styles['push-button']}
      style={{
        backgroundImage: `url(${isPressed ? buttonActive : buttonNormal})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 1,
        cursor: 'pointer',
        pointerEvents:  'auto',
      }}
    />
  );
};

export default PushButton;
