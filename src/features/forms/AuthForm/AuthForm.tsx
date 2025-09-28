import React, { memo } from 'react';
import { Input, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

type AuthFormProps = {
  email: string;
  password: string;
};

type User = {
  email: string;
  password: string;
};

const prefix = <UserOutlined />;

export const AuthForm = memo(() => {
  const { t } = useTranslation();

  const validate = (values: User) => {
    const errors: Partial<User> = {};
    if (!values.email) {
      errors.email = t('errors.is_required');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = t('errors.email_invalid');
    }

    if (!values.password) {
      errors.password = t('errors.is_required');
    } else if (values.password.length < 6) {
      errors.password = t('errors.password_invalid');
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
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
        <button type="submit">{t('forms.AuthForm.submit.title')}</button>
      </Space>
    </form>
  );
});
