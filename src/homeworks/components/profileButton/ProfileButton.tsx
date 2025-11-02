import React, { FC, useEffect } from 'react';
// eslint-disable-next-line import/named
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const ProfileButton: FC = () => {
  const navigate = useNavigate();

  return (
    <Button type="text" title="Profile" onClick={() => navigate('/profile')}>
      <UserOutlined rev={''} />
    </Button>
  );
};
