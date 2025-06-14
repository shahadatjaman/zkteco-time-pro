import { useEffect, useState } from 'react';

const useIsSmallDevice = (breakpoint = 950): boolean => {
  const [isSmall, setIsSmall] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < breakpoint;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsSmall(event.matches);
    };

    // Set initial value
    setIsSmall(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [breakpoint]);

  return isSmall;
};

export default useIsSmallDevice;
