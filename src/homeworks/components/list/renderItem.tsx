import React from 'react';
import { OperationType } from '../../../features/redux/types';
import { MemoizedOperation } from '../operation/Operation';
import { MemoizedOperationShort } from '../operationShort/OperationShort';

const renderOperation = (operation: OperationType) => {
  return (
    <MemoizedOperation
      sum={operation.amount}
      category={operation.category?.name || 'нет'}
      name={operation.name || ''}
      description={operation.description || ''}
      date={new Date(operation.createdAt)}
    />
  );
};

const renderShortOperation = (operation: OperationType) => {
  return (
    <MemoizedOperationShort
      sum={operation.amount}
      category={operation?.category?.name || 'нет'}
      name={operation.name || ''}
      description={operation.description || ''}
    />
  );
};

export const render = (operation: OperationType) => {
  //return renderOperation(operation);
  return renderShortOperation(operation);
};
