import { userDiscounts, userProductDiscounts } from './data';
import { UserType, ProductType } from './types';

export const getUserDiscount = async (userType: UserType): Promise<number> => {
  return -1;
  //return userDiscounts[userType] || 0;
};

export const getProductDiscount = async (userType: UserType, productType: ProductType): Promise<number> => {
  return -1;
  //const userProduct = userProductDiscounts.find((up) => up.userType === userType && up.productType === productType);
  //return userProduct ? userProduct.discount : 0;
};
