import { useRef, useEffect } from 'react';

import { HAMMER_STATE } from '../constants/gameStatus';

export const useScaleAnimation = (hammerState, maxHeight = 139) => {
  const energyRef = useRef(null);
  const directionRef = useRef(1);
  const frameRef = useRef(null);
  const velocityRef = useRef(1.5);
  const currentHeightRef = useRef(0);
  const isResettingRef = useRef(false);
  const resetFrameRef = useRef(null);

  // Функция для плавного сброса
  const smoothReset = () => {
    if (resetFrameRef.current) {
      cancelAnimationFrame(resetFrameRef.current);
    }

    isResettingRef.current = true;
    const startHeight = currentHeightRef.current;
    const startTime = performance.now();
    const duration = 500;

    const animateReset = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easeOutCubic = 1 - (1 - progress) ** 3;
      const currentHeight = startHeight * (1 - easeOutCubic);

      currentHeightRef.current = currentHeight;

      if (energyRef.current) {
        energyRef.current.style.height = `${currentHeight}px`;
        const afterBottom = -1 + currentHeight;
        energyRef.current.style.setProperty('--after-bottom', `${afterBottom}px`);
      }

      if (progress < 1) {
        resetFrameRef.current = requestAnimationFrame(animateReset);
      } else {
        currentHeightRef.current = 0;
        if (energyRef.current) {
          energyRef.current.style.height = `0px`;
          energyRef.current.style.setProperty('--after-bottom', `-1px`);
        }
        isResettingRef.current = false;
        resetFrameRef.current = null;
      }
    };

    resetFrameRef.current = requestAnimationFrame(animateReset);
  };

  // Анимация через requestAnimationFrame
  useEffect(() => {
    if (hammerState !== HAMMER_STATE.INGAME) {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return;
    }

    // Если идет сброс, прерываем его
    if (isResettingRef.current && resetFrameRef.current) {
      cancelAnimationFrame(resetFrameRef.current);
      resetFrameRef.current = null;
      isResettingRef.current = false;
    }

    const animate = () => {
      velocityRef.current += directionRef.current * 0.1;

      let next = currentHeightRef.current + velocityRef.current;

      if (next >= maxHeight) {
        next = maxHeight;
        directionRef.current = -1;
        velocityRef.current = 0;
      } else if (next <= 0) {
        next = 0;
        directionRef.current = 1;
        velocityRef.current = 0;
      }

      if (Math.random() < 0.02) {
        directionRef.current *= -1;
        velocityRef.current *= 0.3;
      }

      currentHeightRef.current = next;

      if (energyRef.current) {
        energyRef.current.style.height = `${next}px`;
        const afterBottom = -1 + next;
        energyRef.current.style.setProperty('--after-bottom', `${afterBottom}px`);
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [hammerState, maxHeight]);

  return {
    energyRef,
    currentHeightRef,
    smoothReset,
    isResettingRef,
  };
};
