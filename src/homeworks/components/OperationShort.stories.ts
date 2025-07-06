import type { Meta, StoryObj } from '@storybook/react';
import { OperationShort, OperationShortProps } from './OperationShort';

const meta: Meta<typeof OperationShort> = {
  title: 'Components/OperationShort',
  component: OperationShort,
  tags: ['autodocs'],
  argTypes: {
    sum: { control: 'number', min: 0 },
    category: { control: 'inline-radio', options: ['доходы', 'расходы'] },
    name: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;

export const Standart: StoryObj<OperationShortProps> = {
  args: {
    sum: 5000,
    category: 'расходы',
    name: 'покупка товаров',
    description:
      'продукт отличного качества, довольно высокого качества. Цена выше рынка. Приятно пользоваться, думаю прослужит долго.',
  },
};
