import React, { FC } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import s from './logout.module.sass';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { clearToken } from './../../../features/redux/AuthSlice';

export const LogOut: FC = () => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(clearToken());
  };

  return (
    <Button type="text" onClick={clickHandler}>
      <LogoutOutlined />
    </Button>
  );
};
