import React, { FC, useEffect } from 'react';
// eslint-disable-next-line import/named
import { LoginOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import s from './login-button.module.sass';
import { useNavigate } from 'react-router-dom';

export const LoginButton: FC = () => {
  const navigate = useNavigate();

  return (
    <Button type="text" title="Войти" onClick={() => navigate('/login')}>
      <LoginOutlined />
    </Button>
  );
};
