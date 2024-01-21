import React from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import Header from './Header';
import Sider from './Sider';
import ErrorBoundary from '../error/ErrorBoundary';
import { useOutlet } from 'react-router-dom';

const { Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const outlet = useOutlet();

  return (
    <Layout>
      <Header />
      <Content style={{ padding: '0 48px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Layout
          style={{ marginTop: 16, padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          <Sider />
          <ErrorBoundary>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              { outlet ? outlet : 'welcome!' }
            </Content>
          </ErrorBoundary>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainLayout;