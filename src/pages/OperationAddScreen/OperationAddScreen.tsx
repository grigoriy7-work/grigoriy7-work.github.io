import React, { FC, useState } from 'react';
import { ModalWindow } from '../../homeworks/components/modalWindow/ModalWindow';
import { OperationForm } from '../../features/forms/OperationForm/OperationForm';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

export const OperationAddScreen: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const openWindowHandler = () => {
    setIsVisible((pref) => !pref);
  };
  const { t } = useTranslation();
  return (
    <div>
      <Button onClick={() => openWindowHandler()}>{t('forms.OperationForm.title')}</Button>
      <ModalWindow title={t('forms.OperationForm.title')} isVisible={isVisible} hide={openWindowHandler}>
        <OperationForm />
      </ModalWindow>
    </div>
  );
};
