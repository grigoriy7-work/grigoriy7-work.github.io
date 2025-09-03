import React, { forwardRef } from 'react';
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

export const OperationShort = forwardRef<HTMLDivElement, OperationShortProps>(
  ({ sum, category, name, description }, ref) => {
    return (
      <div className={s.box} ref={ref}>
        <div className={s.item}>
          <span title="Сумма">{sum}</span>
        </div>
        <div className={s.item}>
          <span title="Категория">{category}</span>
        </div>
        <div className={s.item}>
          <span title="Название">{name}</span>
        </div>
        <div className={s.item}>
          <span title="Описание">{description}</span>
        </div>
      </div>
    );
  }
);

OperationShort.displayName = 'OperationShort';

export const MemoizedOperationShort = React.memo(OperationShort);
