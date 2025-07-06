import type { Meta, StoryObj } from '@storybook/react';
import { Operation, OperationProps } from './Operation';

const meta: Meta<typeof Operation> = {
  title: 'Components/Operation',
  component: Operation,
  tags: ['autodocs'],
  argTypes: {
    sum: { control: 'number', min: 0 },
    category: { control: 'inline-radio', options: ['доходы', 'расходы'] },
    name: { control: 'text' },
    description: { control: 'text' },
    date: { control: 'date' },
  },
};

export default meta;

export const Standart: StoryObj<OperationProps> = {
  args: {
    sum: 5000,
    category: 'расходы',
    name: 'покупка товаров',
    description: '',
    date: new Date('2025-07-06'),
  },
};
