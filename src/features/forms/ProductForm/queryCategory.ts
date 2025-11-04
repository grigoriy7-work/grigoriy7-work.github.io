import { gql } from '@apollo/client';

export const GET_CATEGORIES_QUERY = gql`
  query Data {
    categories {
      getMany {
        data {
          id
          createdAt
          commandId
          name
          updatedAt
        }
      }
    }
  }
`;

export interface CategoriesResponse {
  id: string;
  createdAt: Date;
  commandId: string;
  name: string;
  updatedAt: Date;
}

export interface GetManyCategoriesResponse {
  categories: {
    getMany: {
      data: Array<CategoriesResponse>;
    };
  };
}
