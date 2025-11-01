import React, { FC } from 'react';
import { Input, Space, Button } from 'antd';
// eslint-disable-next-line import/named
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { useMutation } from '@apollo/client/react';
import { setToken } from '../../redux/AuthSlice';
import { useLocation } from 'react-router-dom';
import { LoginHandlerAsync, LOGIN_MUTATION, SignupHandlerAsync, SIGNUP_MUTATION } from './handlers';
import type { LoginVariables, LoginResponse, SignupVariables, SignupResponse } from './handlers';

const prefix = <UserOutlined rev={''} />;

export const LoginForm: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const [loginMutation, { loading, error }] = useMutation<LoginResponse, LoginVariables>(LOGIN_MUTATION);
  const [signupMutation, { loading: loadingSignup, error: errorSignup }] = useMutation<SignupResponse, SignupVariables>(
    SIGNUP_MUTATION
  );
  const location = useLocation();

  const eventAfter = (newToken: string) => {
    dispatch(setToken(newToken));
  };

  const commandId = 'OTUS_React-2025-05_Grigoriy';

  const formik = useFormik({
    initialValues: {
      email: 'super-seller@test.com',
      password: '123123',
    },
    onSubmit: async (values) => {
      console.log(values);

      switch (location.pathname) {
        case '/login':
          console.log('Login submit');
          await LoginHandlerAsync(values, loginMutation, eventAfter);
          break;
        case '/registration':
          console.log('Registration submit');
          await SignupHandlerAsync({ ...values, commandId }, signupMutation, eventAfter);
          break;
      }
    },
  });

  return (
    <div>
      <h2>
        {
          location.pathname === '/login' ? 'Вход' : 'Регистрация'
          /*t('forms.AuthForm.title')*/
        }
      </h2>
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
          <Button htmlType="submit" disabled={loading || loadingSignup}>
            {t('forms.AuthForm.submit.title')}
          </Button>
        </Space>
      </form>
    </div>
  );
};
