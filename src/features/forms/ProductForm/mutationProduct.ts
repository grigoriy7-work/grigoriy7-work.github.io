import { gql } from '@apollo/client';
//import { useMutation } from '@apollo/client/react';

export interface ProductAddInput {
  categoryId: string;
  name: string;
  price: number;
}

export interface MutationAddProductResponse {
  id: string;
  name: string;
  price: number;
  commandId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const MUTATION_ADD_PRODUCT = gql`
  mutation Products($input: ProductAddInput!) {
    products {
      add(input: $input) {
        category {
          commandId
          createdAt
          id
          name
          updatedAt
        }
        commandId
        createdAt
        id
        name
        price
        updatedAt
      }
    }
  }
`;
