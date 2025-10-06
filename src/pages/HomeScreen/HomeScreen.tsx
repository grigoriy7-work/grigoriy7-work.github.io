import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const HomeScreen: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('screens.HomeScreen.title')}</h2>
    </div>
  );
};
