import React, { memo } from 'react';
import { Input, InputNumber, Space, DatePicker, Select, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Operation from 'antd/es/transfer/operation';
// eslint-disable-next-line import/named
import { DollarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import s from './OperationForm.module.sass';
import cn from 'clsx';

interface Operation {
  /**сумма */
  sum: number;
  /**название категории */
  category: string;
  /**название */
  name: string;
  /**описание */
  description: string;
  /**дата */
  date: Date;
}

export const OperationForm = memo(() => {
  const { t } = useTranslation();
  const { TextArea } = Input;
  const prefix = <DollarOutlined />;

  const validate = (values: Operation) => {
    const errors: Partial<Operation> = {};

    if (!values.name) {
      errors.name = t('errors.is_required');
    }

    if (!values.description) {
      errors.description = t('errors.is_required');
    }

    return errors;
  };

  const formik = useFormik<Operation>({
    initialValues: {
      sum: 1,
      category: 'Расход',
      name: '',
      description: '',
      date: new Date(Date.now()),
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <h2>{t('forms.OperationForm.title')}</h2>
      <form onSubmit={formik.handleSubmit}>
        <Space direction="vertical" size="small">
          <InputNumber
            prefix={prefix}
            value={formik.values.sum}
            onChange={(value) => formik.setFieldValue('sum', value)}
            onBlur={formik.handleBlur}
            min={0}
            max={1000}
            step={1}
            className={cn(s.field)}
          />
          <Select
            placeholder={t('forms.OperationForm.category.placeholder')}
            defaultValue={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            options={['Доход', 'Расход'].map((category) => ({
              label: category,
              value: category,
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
            name="date"
            placeholder={t('forms.OperationForm.date.placeholder')}
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
