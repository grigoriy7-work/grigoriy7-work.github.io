import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileCompletedForm } from './ProfileCompletedForm';
import { Page } from '../../shared/ui/Page';
//import s from './ProfileScreen.sass';

export const ProfileScreen: FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t`screens.ProfileScreen.title`}>
      <ProfileCompletedForm />
    </Page>
  );
};

export default ProfileScreen;
