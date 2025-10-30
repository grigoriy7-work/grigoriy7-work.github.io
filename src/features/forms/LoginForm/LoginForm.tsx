import React, { FC } from 'react';
import { Input, Space, Button } from 'antd';
// eslint-disable-next-line import/named
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { setToken } from '../../redux/AuthSlice';

const prefix = <UserOutlined rev={''} />;

interface LoginVariables {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    profile {
      signin(email: $email, password: $password) {
        token
      }
    }
  }
`;

export const LoginForm: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const [loginMutation, { loading, error }] = useMutation<{ profile: { signin: { token: string } } }, LoginVariables>(
    LOGIN_MUTATION
  );

  const handleLogin = async (values: LoginVariables) => {
    try {
      const response = await loginMutation({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      const newToken = response.data.profile.signin.token;
      dispatch(setToken(newToken));
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: 'super-seller@test.com',
      password: '123123',
    },
    onSubmit: async (values) => {
      console.log(values);
      await handleLogin(values);
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
          <Button htmlType="submit" disabled={loading}>
            {t('forms.AuthForm.submit.title')}
          </Button>
        </Space>
      </form>
    </div>
  );
};
