import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;
const MainHeader: React.FC = () => {
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="logo" />
    </Header>
  );
}

export default MainHeader;