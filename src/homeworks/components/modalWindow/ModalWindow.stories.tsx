import type { Meta, StoryObj } from '@storybook/react';
import { ModalWindow, ModalWindowProps } from './ModalWindow';
import { ThemeContextProvider } from '../ThemeContext';
import React from 'react';

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
  decorators: [
    (Story) => (
      <ThemeContextProvider>
        <Story />
      </ThemeContextProvider>
    ),
  ],
};

export default meta;

export const Standart: StoryObj<ModalWindowProps> = {
  args: {
    title: 'Модальное окно',
    isVisible: true,
  },
};
