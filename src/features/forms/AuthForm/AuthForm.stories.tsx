import type { Meta, StoryObj } from '@storybook/react';
import { LanguageContextProvider } from '../../../homeworks/components/LanguageContext';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import { AuthForm } from './AuthForm';

const meta: Meta<typeof AuthForm> = {
  title: 'Components/AuthForm',
  component: AuthForm,
  tags: ['autodocs'],
  decorators: [
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
  render: () => <AuthForm />,
};
