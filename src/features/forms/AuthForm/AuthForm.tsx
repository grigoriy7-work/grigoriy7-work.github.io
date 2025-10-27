import React, { memo, useCallback, useEffect } from 'react';
import { Input, Space, Button, Select } from 'antd';
// eslint-disable-next-line import/named
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import s from './AuthForm.module.sass';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, fetchProfile, fetchRegistration, registrationStart } from '../../redux/AuthSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchAuthData } from './registration';
import { useSignUpMutation } from '../../redux/authQuery';
import { ServerErrors } from './types';

type User = {
  email: string;
  password: string;
  typeRequest?: 'Random' | 'Запрос' | 'Thunk' | 'Saga' | 'RTK Query';
};

const prefix = <UserOutlined rev={''} />;

export const AuthForm = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [signUpUser, { isError: isErrorQueryRegistration, error: errorQueryRegistration }] = useSignUpMutation();
  const errorRegistration = useSelector((state: RootState) => state.auth.errorRegistration);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (errorRegistration) {
      const firstMessageError =
        errorRegistration.errors.length > 0 ? errorRegistration.errors[0].message : 'Unknown error';
      alert(firstMessageError);
    }

    if (isErrorQueryRegistration && errorQueryRegistration) {
      if ('data' in errorQueryRegistration) {
        const authData = errorQueryRegistration.data as ServerErrors;
        const firstMessageError = authData.errors.length > 0 ? authData.errors[0].message : 'Unknown error';
        alert(firstMessageError);
      }
    }
  }, [errorRegistration, errorQueryRegistration, isErrorQueryRegistration]);

  useEffect(() => {
    console.log('AuthForm Token changed:', token);
    if (token !== '') {
      dispatch(fetchProfile());
    }
  }, [token]);

  /*const validate = (values: User) => {
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
  };*/

  const formik = useFormik({
    initialValues: {
      email: 'admin@test.com',
      password: '123123',
      typeRequest: 'Запрос',
    },
    //validate,
    onSubmit: async (values) => {
      console.log(values);

      if (token === '') {
        switch (values.typeRequest) {
          case 'Random':
            const newToken = crypto.randomUUID();
            dispatch(setToken(newToken));
            break;
          case 'Запрос':
            try {
              const authData = await fetchAuthData(values.email, values.password);
              if (authData.authResult != null) {
                const newToken = authData.authResult?.token;
                dispatch(setToken(newToken));
              }
              if (authData.serverErrors != null) {
                const fisrtMessageError =
                  authData.serverErrors?.errors.length > 0 ? authData.serverErrors.errors[0].message : 'Unknown error';
                alert(fisrtMessageError);
              }
            } catch (error) {
              console.error('Registration error:', error);
            }
            break;
          case 'Thunk':
            dispatch(fetchRegistration({ email: values.email, password: values.password }));
            break;
          case 'Saga':
            dispatch(registrationStart({ email: values.email, password: values.password }));
            break;
          case 'RTK Query':
            await signUpUser({
              email: values.email,
              password: values.password,
              commandId: 'OTUS_React-2025-05',
            });
            break;
          default:
            break;
        }
      }
    },
  });

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
          <Select
            value={formik.values.typeRequest}
            placeholder={t('forms.AuthForm.type-request')}
            defaultValue={'Запрос'}
            onChange={(value) => formik.setFieldValue('typeRequest', value)}
            onBlur={formik.handleBlur}
            options={['Запрос', 'Thunk', 'Saga', 'RTK Query', 'Random'].map((type) => ({
              label: type,
              value: type,
            }))}
            style={{ width: 200 }}
          />
          <Button htmlType="submit">{t('forms.AuthForm.submit.title')}</Button>
        </Space>
      </form>
    </div>
  );
});

AuthForm.displayName = 'AuthForm';
