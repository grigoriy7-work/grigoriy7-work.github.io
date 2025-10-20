import type { Meta, StoryObj } from '@storybook/react';
import { List, ListProps } from './List';
import { OperationType } from '../../ts1/3_write';
import { render } from './renderItem';

const operations: Array<OperationType> = [
  {
    id: '1',
    type: 'Cost',
    createdAt: Date.now().toString(),
    amount: 5000,
    category: { id: '1', name: 'Продукты' },
    name: 'покупка товаров',
    desc: 'продукт отличного качества, довольно высокого качества. Цена выше рынка. Приятно пользоваться, думаю прослужит долго.',
  },
];

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  argTypes: {
    operations: { control: 'object', description: 'Список операций' },
    render: { control: 'object', description: 'Функция рендера элемента списка' },
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Standart: Story = {
  args: {
    operations: operations,
    render: render,
  },
};
