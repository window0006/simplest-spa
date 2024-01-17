import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import { routes } from '../router/router';

import type { RouteItem } from '../router/router';
import { MenuProps } from 'antd';

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getMenuItems(routes: RouteItem[]): MenuItem[] {
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [];

  routes.forEach((route) => {
    const { path, menu } = route;

    if (menu.visible === false) {
      return;
    }

    if (route.children) {
      menuItems.push({
        ...menu,
        label: menu.title,
        children: getMenuItems(route.children),
      });
    } else {
      menuItems.push({
        ...menu,
        label: menu.title,
        onClick: () => navigate(path),
      });
    }
  });
  return menuItems;
}

const MainSider: React.FC = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = getMenuItems(routes[0].children as RouteItem[]);
  menuItems.unshift({
    ...routes[0].menu,
    label: routes[0].menu.title,
    onClick: () => navigate(routes[0].path),
  })
  
  return (
    <Sider style={{ background: colorBgContainer }} width={200}>
      <Menu
        mode="inline"
        style={{ height: '100%' }}
        items={menuItems}
      />
    </Sider>
  );
};

export default MainSider;