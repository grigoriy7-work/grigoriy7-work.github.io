import type { Meta, StoryObj } from '@storybook/react';
import { LanguageContextProvider } from '../../../homeworks/components/LanguageContext';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import { OperationForm } from './OperationForm';
import s from './OperationForm.sass';

const meta: Meta<typeof OperationForm> = {
  title: 'Components/OperationForm',
  component: OperationForm,
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
  render: () => <OperationForm />,
};
