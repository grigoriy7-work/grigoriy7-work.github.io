import type { Meta, StoryObj } from '@storybook/react';
import { List, ListProps } from './List';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  argTypes: {
    operations: {},
  },
};

export default meta;

const operations = [
  {
    sum: 5000,
    category: 'расходы',
    name: 'покупка товаров',
    description:
      'продукт отличного качества, довольно высокого качества. Цена выше рынка. Приятно пользоваться, думаю прослужит долго.',
  },
];

export const Standart: StoryObj<ListProps> = {
  args: {
    operations: operations,
  },
};
