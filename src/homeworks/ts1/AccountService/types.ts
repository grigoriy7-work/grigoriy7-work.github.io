export type UserType = 'Standard' | 'Premium' | 'Gold' | 'Free';

export type ProductType = 'Car' | 'Toy' | 'Food';

export interface UserProduct {
  userType: UserType;
  productType: ProductType;
  discount: number;
}

export interface ProductInfo {
  type: ProductType;
  price: number;
}
