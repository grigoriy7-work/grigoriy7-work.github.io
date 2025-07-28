import React, { ReactNode } from 'react';
import s from './modal-window.module.sass';

export interface ModalWindowProps {
  title: string;
  children?: ReactNode | ReactNode[];
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({ ...props }) => {
  return (
    <div className={[s.mask, props.isVisible && s['mask--visible']].join(' ')}>
      <div className={[s['modal-window'], props.isVisible && s['modal-window--visible']].join(' ')}>
        <div className={[s.header].join(' ')}>
          <div className={[s.title].join(' ')}>
            <span>{props.title}</span>
          </div>

          <div className={s['close-box']}>
            <button className={s['close-button']} onClick={() => props.setVisible(false)}>
              X
            </button>
          </div>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};
