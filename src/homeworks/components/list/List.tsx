import React, { FC, useCallback, useEffect, useState } from 'react';
import { OperationShortProps, OperationShort } from '../operationShort/OperationShort';
import { useElementOnScreen } from './../UseElementOnScreen';
import { createRandomOperation, Operation } from './../../ts1/3_write';
import s from './list.module.sass';

export interface ListProps {
  /**краткий список операций */
  operations: OperationShortProps[];
}

export const List: FC<ListProps> = ({ operations }) => {
  const [operationList, setOpertationList] = useState<Array<OperationShortProps>>(operations);

  const handleLoadData = useCallback((isVisible: boolean) => {
    if (isVisible === true) {
      setOpertationList((pref) => {
        const operation = createRandomOperation('');
        const short: OperationShortProps = {
          sum: operation.amount,
          category: operation.category.name,
          name: operation.name,
          description: operation.desc,
        };
        pref.push(short);
        const allOperations = [...pref];
        return allOperations;
      });
    }
  }, []);

  const observerRef = useElementOnScreen(handleLoadData);
  const itemOperations = operationList.map((operation, index) => {
    const isLast = index == operationList.length - 1;
    return (
      <div className={s.box} key={index}>
        <OperationShort
          ref={isLast ? observerRef : null}
          sum={operation.sum}
          category={operation.category}
          name={operation.name}
          description={operation.description}
        />
      </div>
    );
  });
  return <div>{itemOperations}</div>;
};
