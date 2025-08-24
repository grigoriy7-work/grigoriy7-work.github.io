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

export const ModalWindow: React.FC<ModalWindowProps> = ({ ...props }) => {
  const theme = useContext(ThemeContext);

  return props.isVisible
    ? createPortal(
        <div className={[s.mask, props.isVisible && s['mask--visible']].join(' ')}>
          <div className={[s['modal-window'], props.isVisible && s['modal-window--visible']].join(' ')}>
            <div className={[s.header, s[`header--${theme.color}`]].join(' ')}>
              <div className={s.title}>
                <span>{props.title}</span>
              </div>

              <div className={s['close-box']}>
                <button className={s['close-button']} onClick={() => props.hide()}>
                  X
                </button>
              </div>
            </div>
            <div className={[s.content, s[`content--${theme.color}`]].join(' ')}>{props.children}</div>
          </div>
        </div>,
        document.body
      )
    : null;
};
