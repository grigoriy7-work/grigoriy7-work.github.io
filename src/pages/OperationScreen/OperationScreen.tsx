import React, { FC } from 'react';
import { List } from '../../homeworks/components/list/List';
import { OperationType } from '../../homeworks/ts1/3_write';
import { render } from '../../homeworks/components/list/renderItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../features/redux/store';

export const OperationScreen: FC = () => {
  const operations = useSelector((state: RootState) => state.opration.operations);

  /*const operations: Array<OperationType> = [
    {
      id: '1',
      type: 'Cost',
      createdAt: Date.now().toString(),
      amount: 5000,
      category: { id: '1', name: 'Продукты' },
      name: 'покупка товаров',
      desc: 'продукт отличного качества, довольно высокого качества. Цена выше рынка. Приятно пользоваться, думаю прослужит долго.',
    },
  ];*/

  return (
    <div>
      <List operations={operations} render={render} />
    </div>
  );
};
