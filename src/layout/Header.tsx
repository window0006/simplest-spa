import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;
const MainHeader: React.FC = () => {
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="logo" />
      <h1>A project of interest</h1>
    </Header>
  );
}

export default MainHeader;