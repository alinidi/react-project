import { useEffect, useState } from 'react';

export const useWindowWidth = (): number => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);

      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return width;
};
