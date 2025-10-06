import React, { FC, useState } from 'react';
import { List } from '../../homeworks/components/list/List';
import { OperationType } from '../../homeworks/ts1/3_write';
import { render } from '../../homeworks/components/list/renderItem';
import { ModalWindow } from '../../homeworks/components/modalWindow/ModalWindow';
import { OperationForm } from '../../features/forms/OperationForm/OperationForm';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

export const OperationScreen: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const openWindowHandler = () => {
    setIsVisible((pref) => !pref);
  };
  const { t } = useTranslation();

  const operations: Array<OperationType> = [
    {
      id: '1',
      type: 'Cost',
      createdAt: Date.now().toString(),
      amount: 5000,
      category: { id: '1', name: 'Продукты' },
      name: 'покупка товаров',
      desc: 'продукт отличного качества, довольно высокого качества. Цена выше рынка. Приятно пользоваться, думаю прослужит долго.',
    },
  ];

  return (
    <div>
      <Button onClick={() => openWindowHandler()}>{t('forms.OperationForm.title')}</Button>
      <ModalWindow title={t('forms.OperationForm.title')} isVisible={isVisible} hide={openWindowHandler}>
        <OperationForm />
      </ModalWindow>
      <List operations={operations} render={render} />
    </div>
  );
};
