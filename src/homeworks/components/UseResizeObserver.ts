import React, { useRef } from 'react';

export const useResizeObserver = (callback: (entris: ResizeObserverEntry[]) => void) => {
  const ref = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      callback(entries);
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [callback]);
  return [ref];
};
