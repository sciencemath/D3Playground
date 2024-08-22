import { useEffect, useRef } from 'react';

/**
 * Needed because we are in StrictMode/dev
 * Does render things once
 * 
 * @param {Function} effect 
 */
export const useMount = (effect) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return effect();
    }

    mounted.current = true;

    return () => {};
  }, [mounted, effect]);
};