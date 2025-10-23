import React, { memo, useCallback, useEffect, useState } from 'react';
import { Input, Space, Button } from 'antd';
// eslint-disable-next-line import/named
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import s from './AuthForm.module.sass';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, fetchProfile } from '../../redux/AuthSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { AuthResult, SignUpBody, ResultFetchAuth } from './types';

type User = {
  email: string;
  password: string;
};

const prefix = <UserOutlined rev={''} />;

const fetchAuthData = async (email: string, passowrd: string) => {
  const commandId = 'OTUS_React-2025-05';
  const resultFetchAuth: ResultFetchAuth = {};

  try {
    const signUpBody: SignUpBody = {
      email: email,
      password: passowrd,
      commandId: commandId,
    };

    const response = await fetch('http://19429ba06ff2.vps.myjino.ru/api/signup1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpBody),
    });

    if (!response.ok) throw new Error('Ошибка при отправки запроса регистрации!');
    const result: AuthResult = await response.json();
    resultFetchAuth.authResult = result;
  } catch (error) {
    resultFetchAuth.serverErrors = error;
  }

  return resultFetchAuth;
};

export const AuthForm = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

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
      email: 'admin@test.com',
      password: '123123',
    },
    validate,
    onSubmit: async (values) => {
      console.log(values);

      if (token === '') {
        //const newToken = crypto.randomUUID();
        const authData = await fetchAuthData(values.email, values.password);
        if (authData.authResult != null) {
          const newToken = authData.authResult?.token;
          dispatch(setToken(newToken));
          dispatch(fetchProfile());
        }
      }
    },
  });

  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <div>
      <h2>{t('forms.AuthForm.title')}</h2>
      <span>{token}</span>
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
});

AuthForm.displayName = 'AuthForm';
