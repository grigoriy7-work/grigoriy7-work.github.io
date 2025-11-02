import React, { FC } from 'react';
import { Input, Space, Button, message } from 'antd';
// eslint-disable-next-line import/named
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { useMutation } from '@apollo/client/react';
import { setToken } from '../../redux/AuthSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginHandlerAsync, LOGIN_MUTATION, SignupHandlerAsync, SIGNUP_MUTATION } from './handlers';
import type { LoginVariables, LoginResponse, SignupVariables, SignupResponse } from './handlers';
import { ServerErrors } from '../../graphql/types';

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
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const fromPathName = (location.state as { from?: Location })?.from?.pathname || '/';

  const eventAfter = (newToken: string) => {
    dispatch(setToken(newToken));
    navigate(fromPathName, { replace: true });
    messageApi.open({
      type: 'success',
      content: `Токен получен: ${newToken}`,
    });
  };

  const eventError = (err: ServerErrors) => {
    messageApi.open({
      type: 'error',
      content: `Ошибка авторизации: ${err.errors[0].message || 'Unknown error'}`,
    });
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
          await LoginHandlerAsync(values, loginMutation, eventAfter, eventError);
          break;
        case '/registration':
          console.log('Registration submit');
          await SignupHandlerAsync({ ...values, commandId }, signupMutation, eventAfter, eventError);
          break;
      }
    },
  });

  return (
    <div>
      {contextHolder}
      <h2>
        {
          location.pathname === '/login' ? 'Вход' : 'Регистрация'
          /*t('forms.AuthForm.title')*/
        }
      </h2>
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
