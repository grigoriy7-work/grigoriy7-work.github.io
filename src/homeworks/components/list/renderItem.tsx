import React from 'react';
import { Operation } from '../operation/Operation';
import { OperationShort } from '../operationShort/OperationShort';
import { OperationType } from 'src/features/redux/types';

const renderOperation = (operation: OperationType) => {
  return (
    <Operation
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
    <OperationShort
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
