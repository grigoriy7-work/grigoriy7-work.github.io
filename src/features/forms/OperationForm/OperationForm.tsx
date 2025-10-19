import React, { memo } from 'react';
import { Input, InputNumber, Space, DatePicker, Select, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
// eslint-disable-next-line import/named
import { DollarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import s from './OperationForm.module.sass';
import cn from 'clsx';
import { useDispatch } from 'react-redux';
import { setOperation } from '../../redux/OperationSlice';
import { AppDispatch } from '../../redux/store';
import { OperationType } from '../../redux/types';

export const OperationForm = memo(() => {
  const { t } = useTranslation();
  const { TextArea } = Input;
  const prefix = <DollarOutlined />;
  const dispatch = useDispatch<AppDispatch>();

  const validate = (values: OperationType) => {
    const errors: Partial<OperationType> = {};

    if (!values.name) {
      errors.name = t('errors.is_required');
    }

    if (!values.description) {
      errors.description = t('errors.is_required');
    }

    return errors;
  };

  const formik = useFormik<OperationType>({
    initialValues: {
      id: '0',
      amount: 1,
      type: 'Расход',
      name: '',
      description: '',
      createdAt: new Date(Date.now()).toISOString(),
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      const operation: OperationType = {
        ...values,
      };

      dispatch(setOperation(operation));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Space direction="vertical" size="small">
          <InputNumber
            prefix={prefix}
            value={formik.values.amount}
            onChange={(value) => formik.setFieldValue('amount', value)}
            onBlur={formik.handleBlur}
            min={0}
            max={1000}
            step={1}
            className={cn(s.field)}
          />
          <Select
            placeholder={t('forms.OperationForm.type.placeholder')}
            defaultValue={formik.values.type}
            onChange={(value) => formik.setFieldValue('type', value)}
            onBlur={formik.handleBlur}
            options={['Доход', 'Расход'].map((type) => ({
              label: type,
              value: type,
            }))}
            className={cn(s.field)}
          />
          <Input
            name="name"
            placeholder={t('forms.OperationForm.name.placeholder')}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={cn(s.field)}
          />
          {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
          <TextArea
            name="description"
            placeholder={t('forms.OperationForm.description.placeholder')}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={4}
            className={cn(s.field)}
          />
          {formik.touched.description && formik.errors.description ? <div>{formik.errors.description}</div> : null}
          <DatePicker
            name="createdAt"
            placeholder={t('forms.OperationForm.createdAt.placeholder')}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={dayjs(Date.now())}
            format={'DD.MM.YYYY'}
            className={cn(s.field)}
          />
          <Button htmlType="submit">{t('forms.OperationForm.submit.title')}</Button>
        </Space>
      </form>
    </>
  );
});

OperationForm.displayName = 'OperationForm';
