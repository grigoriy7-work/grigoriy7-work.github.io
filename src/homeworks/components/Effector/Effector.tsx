import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import cn from 'clsx';
import { createPortal } from 'react-dom';
import s from './Effector.module.sass';

type Coords = {
  x: number;
  y: number;
};

export type EffectorProps = {
  className?: string;
  container?: HTMLElement;
};

export type EffectorRef = {
  show?: (elem: React.ReactNode, coords: Coords) => void;
};

export const Effector = forwardRef<EffectorRef, EffectorProps>(({ className, container = document.body }, ref) => {
  const [elements, setElements] = useState<Array<{ id: string; elem: React.ReactNode; coords: Coords }>>([]);

  useImperativeHandle(ref, () => ({
    show: (elem, coords) => {
      //console.info('cords', coords);
      setElements((v) => [...v, { id: Math.random().toString(16), elem, coords }]);
    },
  }));

  const onAnimationEnd = (id: string) => (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setElements((v) => v.filter((i) => i.id !== id));
  };

  return createPortal(
    elements.map((item) => (
      <div
        key={item.id}
        className={cn(s.elem, className)}
        onAnimationEnd={onAnimationEnd(item.id)}
        style={{ top: item.coords.y, left: item.coords.x }}
      >
        <div className={s.shifter} style={{ top: item.coords.y, left: item.coords.x }}>
          {item.elem}
        </div>
      </div>
    )),
    container
  ) as React.ReactNode;
});

Effector.displayName = 'Effector';
