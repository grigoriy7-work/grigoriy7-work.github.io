import React, { ReactNode, useContext } from 'react';
import s from './modal-window.module.sass';
import { ThemeContext } from 'src/homeworks/ThemeContext';

export interface ModalWindowProps {
  title: string;
  children?: ReactNode | ReactNode[];
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({ ...props }) => {
  const theme = useContext(ThemeContext);

  return (
    <div className={[s.mask, props.isVisible && s['mask--visible']].join(' ')}>
      <div className={[s['modal-window'], props.isVisible && s['modal-window--visible']].join(' ')}>
        <div className={[s.header, s[`header--${theme.color}`]].join(' ')}>
          <div className={[s.title].join(' ')}>
            <span>{props.title}</span>
          </div>

          <div className={s['close-box']}>
            <button className={s['close-button']} onClick={() => props.setVisible(false)}>
              X
            </button>
          </div>
        </div>
        <div className={[s.content, s[`content--${theme.color}`]].join(' ')}>{props.children}</div>
      </div>
    </div>
  );
};
