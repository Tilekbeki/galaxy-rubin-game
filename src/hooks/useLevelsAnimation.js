import { useRef, useEffect, useState } from 'react';

export const useLevelsAnimation = (levels, onComplete) => {
  const [animatingLevels, setAnimatingLevels] = useState([]);
  const timeoutRefs = useRef([]);
  const previousLevelsRef = useRef([]);

  const animateLevelsSequentially = (newLevels, oldLevels) => {
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current = [];

    const newHitLevels = newLevels.filter((level) => level.isHit);
    const oldHitIds = oldLevels.filter((level) => level.isHit).map((level) => level.id);

    const levelsToAnimate = newHitLevels.filter((level) => !oldHitIds.includes(level.id));

    levelsToAnimate.forEach((level, index) => {
      const timeoutId = setTimeout(() => {
        setAnimatingLevels((prev) => [...prev, level.id]);

        setTimeout(() => {
          setAnimatingLevels((prev) => prev.filter((id) => id !== level.id));

          if (index === levelsToAnimate.length - 1 && onComplete) {
            onComplete(newHitLevels.length);
          }
        }, 300);
      }, index * 200);

      timeoutRefs.current.push(timeoutId);
    });
  };

  useEffect(() => {
    if (!levels || levels.length === 0) return;

    animateLevelsSequentially(levels, previousLevelsRef.current);
    previousLevelsRef.current = [...levels];

    return () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, [levels]);

  return {
    animatingLevels,
    getLevelClass: (levelId, isHit) => {
      let className = '';
      if (isHit) className = 'hit';
      if (animatingLevels.includes(levelId)) className = 'hit-animate';
      return className;
    },
  };
};
