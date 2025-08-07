import React from 'react';
import s from './operation.module.sass';

export interface OperationProps {
  /**сумма */
  sum: number;
  /**название категории */
  category: string;
  /**название */
  name: string;
  /**описание */
  description: string;
  /**дата */
  date: Date;
}

export const Operation: React.FC<OperationProps> = ({ ...props }) => {
  return (
    <div className={s.box}>
      <div className={s.grid}>
        <span>Сумма</span>
        <span>{props.sum}</span>

        <span>Категория</span>
        <span>{props.category}</span>

        <span>Название</span>
        <span>{props.name}</span>

        <span>Описание</span>
        <span>{props.description}</span>

        <span>Дата</span>
        <span>{props.date.toLocaleDateString()}</span>
      </div>
    </div>
  );
};
