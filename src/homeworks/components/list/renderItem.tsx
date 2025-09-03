import React from 'react';
import { MemoizedOperation } from '../operation/Operation';
import { MemoizedOperationShort } from '../operationShort/OperationShort';
import { OperationType } from '../../ts1/3_write';

const renderOperation = (operation: OperationType) => {
  return (
    <MemoizedOperation
      sum={operation.amount}
      category={operation.category.name}
      name={operation.name}
      description={operation.desc || ''}
      date={new Date(operation.createdAt)}
    />
  );
};

const renderShortOperation = (operation: OperationType) => {
  return (
    <MemoizedOperationShort
      sum={operation.amount}
      category={operation.category.name}
      name={operation.name}
      description={operation.desc || ''}
    />
  );
};

export const render = (operation: OperationType) => {
  //return renderOperation(operation);
  return renderShortOperation(operation);
};
