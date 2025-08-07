import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { ThemeContextProvider } from '../ThemeContext';
import { LanguageContextProvider } from '../LanguageContext';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeContextProvider>
        <Story />
      </ThemeContextProvider>
    ),
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
    (Story) => (
      <LanguageContextProvider>
        <Story />
      </LanguageContextProvider>
    ),
  ],
};

export default meta;

export const Standart: StoryObj = {
  render: () => <Header />,
};
