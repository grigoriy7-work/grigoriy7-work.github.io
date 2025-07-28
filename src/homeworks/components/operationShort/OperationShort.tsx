import React from 'react';
import s from './operation-short.module.sass';

export interface OperationShortProps {
  /**сумма */
  sum: number;
  /**название категории */
  category: string;
  /**название */
  name: string;
  /**описание */
  description: string;
}

export const OperationShort: React.FC<OperationShortProps> = ({ ...props }) => {
  return (
    <div className={s.box}>
      <div className={s.item}>
        <span title="Сумма">{props.sum}</span>
      </div>
      <div className={s.item}>
        <span title="Категория">{props.category}</span>
      </div>
      <div className={s.item}>
        <span title="Название">{props.name}</span>
      </div>
      <div className={s.item}>
        <span title="Описание">{props.description}</span>
      </div>
    </div>
  );
};
