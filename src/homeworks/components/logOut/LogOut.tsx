import React, { FC, useEffect } from 'react';
// eslint-disable-next-line import/named
import { LogoutOutlined } from '@ant-design/icons';
import s from './logout.module.sass';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './../../../features/redux/store';
import { clearToken, setToken, clearProfile, fetchProfile } from './../../../features/redux/AuthSlice';

export const LogOut: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const localStorageListener = (event: StorageEvent) => {
      if (event.key === 'token' && event.newValue !== null) {
        dispatch(setToken(event.newValue));
        dispatch(fetchProfile());
      } else if (event.key === 'token' && event.newValue === null) {
        dispatch(clearToken());
        dispatch(clearProfile());
      }
    };

    window.addEventListener('storage', localStorageListener);

    return () => {
      window.removeEventListener('storage', localStorageListener);
    };
  }, []);

  const clickHandler = () => {
    dispatch(clearToken());
  };

  return (
    <Button type="text" onClick={clickHandler}>
      <LogoutOutlined />
    </Button>
  );
};
