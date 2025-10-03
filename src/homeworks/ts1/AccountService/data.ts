import { UserType, UserProduct } from './types';

export const userDiscounts: Record<UserType, number> = {
  Standard: 0,
  Premium: 0.15,
  Gold: 0.25,
  Free: 1.0,
};

export const userProductDiscounts: UserProduct[] = [
  { userType: 'Standard', productType: 'Toy', discount: 0.02 },
  { userType: 'Standard', productType: 'Food', discount: 0.03 },
  { userType: 'Premium', productType: 'Car', discount: 0.11 },
  { userType: 'Premium', productType: 'Toy', discount: 0.12 },
  { userType: 'Premium', productType: 'Food', discount: 0.13 },
  { userType: 'Gold', productType: 'Car', discount: 0.21 },
  { userType: 'Gold', productType: 'Toy', discount: 0.22 },
  { userType: 'Gold', productType: 'Food', discount: 0.23 },
];
