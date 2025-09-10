import React, { ReactNode, useContext } from 'react';
import s from './modal-window.module.sass';
import { ThemeContext } from '../ThemeContext';
import { createPortal } from 'react-dom';

export interface ModalWindowProps {
  title: string;
  children?: ReactNode | ReactNode[];
  /**Видимость */
  isVisible: boolean;
  hide: () => void;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({ title, children, isVisible, hide }) => {
  const theme = useContext(ThemeContext);
  if (isVisible === false) return null;
  return createPortal(
    <div className={[s.mask, isVisible && s['mask--visible']].join(' ')}>
      <div className={[s['modal-window'], isVisible && s['modal-window--visible']].join(' ')}>
        <div className={[s.header, s[`header--${theme.color}`]].join(' ')}>
          <div className={s.title}>
            <span>{title}</span>
          </div>

          <div className={s['close-box']}>
            <button className={s['close-button']} onClick={() => hide()}>
              X
            </button>
          </div>
        </div>
        <div className={[s.content, s[`content--${theme.color}`]].join(' ')}>{children}</div>
      </div>
    </div>,
    document.body
  );
};
