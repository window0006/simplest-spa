import React from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import MainLayout from '../layout';
import NotFound from '../error/NotFound';

export type RouteItem = {
  path: string;
  element?: React.ReactNode;
  menu: MenuItemType & {
    visible?: boolean;
  };
  children?: RouteItem[];
}

export const routes: RouteItem[] = [
  {
    path: '/',
    element: <MainLayout />,
    menu: {
      key: 'home',
      title: 'Home',
      icon: <UserOutlined />,
    },
    children: [
      {
        path: '/about',
        menu: {
          key: 'about',
          title: 'About',
          icon: <LaptopOutlined />,
        },
        children: [
          {
            path: '/about/me',
            element: <>ME</>,
            menu: {
              key: 'about-me',
              title: 'About Me',
            },
          },
          {
            path: '/about/you',
            element: <>You hh</>,
            menu: {
              key: 'about-you',
              title: 'About You',
            },
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
        menu: {
          key: 'not-found',
          title: 'Not Found',
          visible: false,
        },
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const Router: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default Router;
