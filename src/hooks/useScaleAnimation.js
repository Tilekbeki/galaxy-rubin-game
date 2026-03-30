// hooks/useScaleAnimation.js

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { GAME_STATUS, HAMMER_STATE } from '../constants/gameStatus';

export const useScaleAnimation = ({ onPunch }) => {
  const maxHeight = 139;

  const gameStatus = useSelector((state) => state.game.gameStatus);
  const hammerState = useSelector((state) => state.game.hammerState);

  const energyRef = useRef(null);
  const directionRef = useRef(1);
  const frameRef = useRef(null);
  const resetFrameRef = useRef(null);
  const velocityRef = useRef(1.5);
  const currentHeightRef = useRef(0);
  const isHandledRef = useRef(false);
  const timeoutRef = useRef(null);
  const isResettingRef = useRef(false);

  const smoothReset = () => {
    if (resetFrameRef.current) {
      cancelAnimationFrame(resetFrameRef.current);
    }

    isResettingRef.current = true;

    const startHeight = currentHeightRef.current;
    const startTime = performance.now();
    const duration = 500;

    const animateReset = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const ease = 1 - (1 - progress) ** 3;

      const height = startHeight * (1 - ease);
      currentHeightRef.current = height;

      if (energyRef.current) {
        energyRef.current.style.height = `${height}px`;
        energyRef.current.style.setProperty('--after-bottom', `${-1 + height}px`);
      }

      if (progress < 1) {
        resetFrameRef.current = requestAnimationFrame(animateReset);
      } else {
        currentHeightRef.current = 0;
        isResettingRef.current = false;
      }
    };

    resetFrameRef.current = requestAnimationFrame(animateReset);
  };

  useEffect(() => {
    if (gameStatus === GAME_STATUS.BEFORE) {
      smoothReset();

      directionRef.current = 1;
      velocityRef.current = 1.5;
      isHandledRef.current = false;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [gameStatus]);

  useEffect(() => {
    if (hammerState !== HAMMER_STATE.INGAME) {
      cancelAnimationFrame(frameRef.current);
      return;
    }

    if (isResettingRef.current) {
      cancelAnimationFrame(resetFrameRef.current);
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
        energyRef.current.style.setProperty('--after-bottom', `${-1 + next}px`);
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, [hammerState]);

  useEffect(() => {
    if (hammerState !== HAMMER_STATE.PUNCHED) {
      isHandledRef.current = false;
      clearTimeout(timeoutRef.current);
      return;
    }

    if (isHandledRef.current) return;
    isHandledRef.current = true;

    timeoutRef.current = setTimeout(() => {
      const percent = Math.round((currentHeightRef.current / maxHeight) * 100);

      onPunch?.(percent);
    }, 1000);

    return () => clearTimeout(timeoutRef.current);
  }, [hammerState, onPunch]);

  return {
    energyRef,
  };
};
