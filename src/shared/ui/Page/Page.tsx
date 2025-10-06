import React, { FC } from 'react';
import cn from 'clsx';
import { Frame } from '../Frame';
import s from './Page.module.sass';

export type PageProps = {
  className?: string;
  title: React.ReactNode;
  children: React.ReactNode;
};

export const Page: FC<PageProps> = ({ className, title, children }) => (
  <Frame className={cn(s.root, className)}>
    <h2 className={s.title}>{title}</h2>
    <div className={s.page}>{children}</div>
  </Frame>
);
