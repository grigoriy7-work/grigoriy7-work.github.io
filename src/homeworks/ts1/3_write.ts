/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

/**
 * Нужно создать тип Category, он будет использоваться ниже.
 * Категория содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка, необязательно)
 *
 * Продукт (Product) содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - oldPrice (число, необязательно)
 * - price (число)
 * - category (Категория)
 **/

type Category = {
  id: string;
  name: string;
  photo?: string;
};

type Product = {
  id: string;
  name: string;
  photo: string;
  desc: string;
  createdAt: string;
  oldPrice?: number;
  price: number;
  category: Category;
};

const categories: Category[] = [
  { id: '1', name: 'Мебель' },
  { id: '2', name: 'Продукты' },
  { id: '3', name: 'Бытовая техника' },
  { id: '4', name: 'Одежда' },
  { id: '5', name: 'Инструменты' },
];

const data: Record<string, string[]> = {
  Мебель: ['Стол', 'Диван', 'Кресло'],
  Продукты: ['Сахар', 'Кофе', 'Конфеты', 'Икра'],
  'Бытовая техника': ['Тостер', 'Чайник', 'Кофемолка'],
  Одежда: ['Брюки', 'Футболка', 'Рубашка'],
  Инструменты: ['Дрель', 'Болгарка', 'Рулетка', 'Ключ'],
};

function getRandomProductName(category: string): string {
  const names = data[category];
  const nameIndex = Math.floor(Math.random() * names.length);
  return names[nameIndex];
}

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
export const createRandomProduct = (createdAt: string) => {
  const randomIndexCategory = Math.floor(Math.random() * categories.length);
  const category: Category = categories[randomIndexCategory];
  const nameProduct: string = getRandomProductName(category.name);

  const product: Product = {
    id: 'guid_' + randomIndexCategory,
    name: nameProduct,
    photo: 'photo_' + randomIndexCategory,
    desc: 'лучшая продукция для вас - ' + nameProduct,
    createdAt: createdAt,
    price: randomIndexCategory * 2000,
    oldPrice: randomIndexCategory * 1500,
    category: category,
  };
  return product;
};

/* Операция (Operation) может быть либо тратой (Cost), либо доходом (Profit)
 *
 * Трата (Cost) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Cost')
 *
 * Доход (Profit) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Profit')
 * */

type Cost = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Cost';
};

type Profit = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Profit';
};

export type Operation = Cost | Profit;

const profitCategories: Category[] = [
  { id: '6', name: 'Зарплата' },
  { id: '7', name: 'Подработка' },
];

const costs: Cost[] = [
  {
    id: 'guid_1',
    name: 'хлеб',
    desc: 'ежедневная покупка',
    createdAt: '',
    amount: 20,
    category: categories[1],
    type: 'Cost',
  },
  {
    id: 'guid_2',
    name: 'Стол',
    desc: 'обновление мебели',
    createdAt: '',
    amount: 1,
    category: categories[0],
    type: 'Cost',
  },
  {
    id: 'guid_3',
    name: 'футболка',
    desc: 'покупка в выходной день',
    createdAt: '',
    amount: 3,
    category: categories[3],
    type: 'Cost',
  },
];

const profits: Profit[] = [
  {
    id: 'guid_1',
    name: 'зарплата',
    desc: 'поступление на карту в начале месяца',
    createdAt: '',
    amount: 1,
    category: profitCategories[0],
    type: 'Profit',
  },
  {
    id: 'guid_2',
    name: 'выполнение разовой работы',
    desc: null,
    createdAt: '',
    amount: 5,
    category: profitCategories[1],
    type: 'Profit',
  },
];

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createRandomOperation = (createdAt: string): Operation => {
  const costIndex = Math.floor(Math.random() * costs.length);
  const profitIndex = Math.floor(Math.random() * profits.length);
  const operation: Operation = Math.random() < 0.5 ? costs[costIndex] : profits[profitIndex];
  operation.createdAt = createdAt;
  return operation;
};
