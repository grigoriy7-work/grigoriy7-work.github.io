import React, { useRef, useEffect } from 'react';

type UseElementOnScreenResult = React.RefObject<HTMLDivElement>;
type IntersectionCallback = (isIntersecting: boolean) => void;

export const useElementOnScreen = (
  callback: IntersectionCallback,
  options: IntersectionObserverInit = {}
): UseElementOnScreenResult => {
  const targetRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callbackRef]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        if (entry.isIntersecting) callbackRef.current(entry.isIntersecting);
        if (entry.isIntersecting) observer.unobserve(entry.target);
      },
      options
    );

    if (targetRef.current) observer.observe(targetRef.current);

    return () => {
      if (targetRef.current != null) observer.unobserve(targetRef.current);
    };
  }, [options]);
  return targetRef;
};
