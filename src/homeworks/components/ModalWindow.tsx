import React, { ReactNode } from 'react';
import s from './modal-window.module.sass';

export interface ModalWindowProps {
  title: string;
  children?: ReactNode | ReactNode[];
}

export const ModalWindow: React.FC<ModalWindowProps> = ({ ...props }) => {
  return (
    <div className={[s.mask].join(' ')}>
      <div className={[s['modal-window']].join(' ')}>
        <div className={[s.header].join(' ')}>
          <div className={[s.title].join(' ')}>
            <span>{props.title}</span>
          </div>

          <div className={[s['close-button']].join(' ')}>
            <i>x</i>
          </div>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};
