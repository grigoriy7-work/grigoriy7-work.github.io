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

export const Operation: React.FC<OperationProps> = ({ sum, category, name, description, date }) => {
  return (
    <div className={s.box}>
      <div className={s.grid}>
        <span>Сумма</span>
        <span>{sum}</span>

        <span>Категория</span>
        <span>{category}</span>

        <span>Название</span>
        <span>{name}</span>

        <span>Описание</span>
        <span>{description}</span>

        <span>Дата</span>
        <span>{date.toLocaleDateString()}</span>
      </div>
    </div>
  );
};
