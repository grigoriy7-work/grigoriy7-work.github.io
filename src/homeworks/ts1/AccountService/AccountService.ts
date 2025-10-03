import { UserType, ProductType, ProductInfo } from './types';
//import { userProductDiscounts } from './data';
import { getUserDiscount, getProductDiscount } from './dataLoader';

/*const getProductDiscount = (userType: UserType, productType: ProductType): number => {
  const userProduct = userProductDiscounts.find((up) => up.userType === userType && up.productType === productType);
  return userProduct ? userProduct.discount : 0;
};*/

export const calculateDiscount = async (userType: UserType, productType: ProductType): Promise<number> => {
  let discount = 0;
  const userDiscount = await getUserDiscount(userType);

  if (userDiscount !== undefined) discount += userDiscount;
  if (userType === 'Free') return discount;

  const userProductDiscount = await getProductDiscount(userType, productType);

  if (userProductDiscount != 0) {
    discount += userProductDiscount;
    return discount;
  }

  return 0;
};

export const calculatePrice = async (userType: UserType, product: ProductInfo): Promise<number> => {
  try {
    const discount = await calculateDiscount(userType, product.type);
    const finalPrice = product.price * (1 - discount);
    return parseFloat(finalPrice.toFixed(2));
  } catch (error) {
    throw new Error('Ошибка при расчете цены');
  }
};
