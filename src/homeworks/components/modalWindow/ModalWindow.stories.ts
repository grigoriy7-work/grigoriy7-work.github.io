import type { Meta, StoryObj } from '@storybook/react';
import { ModalWindow, ModalWindowProps } from './ModalWindow';

const meta: Meta<typeof ModalWindow> = {
  title: 'Components/ModalWindow',
  component: ModalWindow,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: { control: 'text', description: 'Заголовок' },
    children: { control: 'text', description: 'Содержимое' },
  },
};

export default meta;

export const Standart: StoryObj<ModalWindowProps> = {
  args: {
    title: 'Модальное окно',
  },
};
