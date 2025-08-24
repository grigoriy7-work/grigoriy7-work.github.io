import React, { FC, useCallback, useState } from 'react';
import { useElementOnScreen } from './../UseElementOnScreen';
import { createRandomOperation, OperationType } from './../../ts1/3_write';
import s from './list.module.sass';
import { Operation } from '../operation/Operation';
import { OperationShort } from '../operationShort/OperationShort';

export interface ListProps {
  /**краткий список операций */
  operations: OperationType[];
  render: (operation: OperationType) => React.ReactElement<typeof Operation, typeof OperationShort> | null;
}

export const List: FC<ListProps> = ({ ...props }) => {
  const [shortOperations, setShortOpertations] = useState<Array<OperationType>>(props.operations);

  const handleLoadData = useCallback((isVisible: boolean) => {
    if (isVisible === true) {
      setShortOpertations((pref) => {
        const operation = createRandomOperation('');
        pref.push(operation);
        const allOperations = [...pref];
        return allOperations;
      });
    }
  }, []);

  const observerRef = useElementOnScreen(handleLoadData);
  const itemOperations = shortOperations.map((operation, index) => {
    const isLast = index == shortOperations.length - 1;
    return (
      <div className={s.box} key={index} ref={isLast ? observerRef : null}>
        {props.render(operation)}
      </div>
    );
  });
  return <div>{itemOperations}</div>;
};
