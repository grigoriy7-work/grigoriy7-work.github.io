import React from 'react';
import cn from 'clsx';
import s from './ComponentInfo.module.sass';

export type ComponentInfoProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  title?: React.ReactNode;
  desc?: React.ReactNode;
  children?: React.ReactNode;
  fullWidth?: boolean;
};

export const ComponentInfo = ({ className, desc, fullWidth, title, children, ...props }: ComponentInfoProps) => {
  return (
    <div className={cn(s.root, className)} {...props}>
      <div className={s.title}>{title}</div>
      <div>{desc}</div>
      <div className={cn(s.main, fullWidth && s.fullWidth)}>{children}</div>
    </div>
  );
};
