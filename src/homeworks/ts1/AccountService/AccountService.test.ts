import { calculatePrice } from './AccountService';
import { userDiscounts } from './data';
import { getUserDiscount, getProductDiscount } from './dataLoader';

jest.mock('./dataLoader', () => ({
  getUserDiscount: jest.fn(),
  getProductDiscount: jest.fn(),
}));

const mockedGetUserDiscount = getUserDiscount as jest.Mock;
const mockedGetProductDiscount = getProductDiscount as jest.Mock;

describe('calculatePrice', () => {
  beforeEach(() => {
    mockedGetUserDiscount.mockClear();
    mockedGetProductDiscount.mockClear();
  });

  describe('for user', () => {
    it('free', async () => {
      const price = 20000;
      const userType = 'Free';
      const userDiscount = userDiscounts[userType];
      mockedGetUserDiscount.mockReturnValue(new Promise((resolve) => resolve(userDiscount)));
      mockedGetProductDiscount.mockReturnValue(new Promise((resolve) => resolve(0)));

      const priceWithDiscount = await calculatePrice(userType, {
        type: 'Car',
        price: price,
      });

      expect(priceWithDiscount).toBe(price * (1 - userDiscount));
    });

    it('standard', async () => {
      const price = 15000;
      const userType = 'Standard';
      const userDiscount = userDiscounts[userType];
      mockedGetUserDiscount.mockReturnValue(new Promise((resolve) => resolve(userDiscount)));
      mockedGetProductDiscount.mockReturnValue(new Promise((resolve) => resolve(0)));

      const priceWithDiscount = await calculatePrice(userType, {
        type: 'Car',
        price: price,
      });

      expect(priceWithDiscount).toBe(price * (1 - userDiscount));
    });
  });

  describe('for product', () => {
    it('food for standard', async () => {
      const price = 100;
      const userType = 'Standard';
      const userDiscount = userDiscounts[userType];
      const productDiscount = 0.03;
      mockedGetUserDiscount.mockReturnValue(new Promise((resolve) => resolve(userDiscount)));
      mockedGetProductDiscount.mockReturnValue(new Promise((resolve) => resolve(productDiscount)));

      const priceWithDiscount = await calculatePrice(userType, {
        type: 'Food',
        price: price,
      });

      expect(priceWithDiscount).toBe(price * (1 - productDiscount));
    });

    it('toy for standard', async () => {
      const price = 75;
      const userType = 'Standard';
      const userDiscount = userDiscounts[userType];
      const productDiscount = 0.02;
      mockedGetUserDiscount.mockReturnValue(new Promise((resolve) => resolve(userDiscount)));
      mockedGetProductDiscount.mockReturnValue(new Promise((resolve) => resolve(productDiscount)));

      const priceWithDiscount = await calculatePrice(userType, {
        type: 'Toy',
        price: price,
      });

      expect(priceWithDiscount).toBe(price * (1 - productDiscount));
    });
  });

  describe('general', () => {
    it('toy for premium', async () => {
      const price = 500;
      const userType = 'Premium';
      const userDiscount = userDiscounts[userType];
      const productDiscount = 0.12;
      mockedGetUserDiscount.mockReturnValue(new Promise((resolve) => resolve(userDiscount)));
      mockedGetProductDiscount.mockReturnValue(new Promise((resolve) => resolve(productDiscount)));

      const priceWithDiscount = await calculatePrice(userType, {
        type: 'Toy',
        price: price,
      });
      expect(priceWithDiscount).toBe(price * (1 - userDiscount - productDiscount));
    });

    it('food for gold', async () => {
      const price = 1500;
      const userType = 'Gold';
      const userDiscount = userDiscounts[userType];
      const productDiscount = 0.23;
      mockedGetUserDiscount.mockReturnValue(new Promise((resolve) => resolve(userDiscount)));
      mockedGetProductDiscount.mockReturnValue(new Promise((resolve) => resolve(productDiscount)));

      const priceWithDiscount = await calculatePrice(userType, {
        type: 'Food',
        price: price,
      });

      expect(priceWithDiscount).toBe(price * (1 - userDiscount - productDiscount));
    });

    it('food for gold expect error', async () => {
      const price = 1500;
      const userType = 'Gold';
      const productDiscount = 1.25;
      mockedGetUserDiscount.mockReturnValue(new Promise((resolve, reject) => reject('Ошибка')));
      mockedGetProductDiscount.mockReturnValue(new Promise((resolve) => resolve(productDiscount)));

      await expect(
        calculatePrice(userType, {
          type: 'Food',
          price: price,
        })
      ).rejects.toThrow('Ошибка при расчете цены');
    });
  });
});
