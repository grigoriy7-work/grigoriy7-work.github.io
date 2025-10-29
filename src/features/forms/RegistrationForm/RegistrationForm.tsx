import React, { FC } from 'react';
import { Input, Space, Button, Select } from 'antd';
// eslint-disable-next-line import/named
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const prefix = <UserOutlined rev={''} />;

export const RegistrationForm: FC = () => {
  const { t } = useTranslation();
  const token = useSelector((state: RootState) => state.auth.token);

  const formik = useFormik({
    initialValues: {
      email: 'admin@test.com',
      password: '123123',
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <h2>{t('forms.AuthForm.title')}</h2>
      <span>Токен: {token}</span>
      <form onSubmit={formik.handleSubmit}>
        <Space direction="vertical" size="small">
          <Input
            prefix={prefix}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('forms.AuthForm.email.placeholder')}
          />
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
          <Input.Password
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('forms.AuthForm.password.placeholder')}
          />
          {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
          <Button htmlType="submit">{t('forms.AuthForm.submit.title')}</Button>
        </Space>
      </form>
    </div>
  );
};
