import type { Meta, StoryObj } from '@storybook/react';
import { LanguageContextProvider } from '../../homeworks/components/LanguageContext';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import ProfileScreen from './ProfileScreen';

const meta: Meta<typeof ProfileScreen> = {
  title: 'Components/ProfileScreen',
  component: ProfileScreen,
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
  render: () => <ProfileScreen />,
};
