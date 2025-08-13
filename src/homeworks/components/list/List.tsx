import React from 'react';
import { OperationShortProps, OperationShort } from '../operationShort/OperationShort';

export interface ListProps {
  operations: OperationShortProps[];
}

export const List: React.FC<ListProps> = ({ ...props }) => {
  const itemOperations = props.operations.map((operation, index) => {
    return (
      <OperationShort
        key={index}
        sum={operation.sum}
        category={operation.category}
        name={operation.name}
        description={operation.description}
      />
    );
  });
  return <div>{itemOperations}</div>;
};
