import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { useMemo } from 'react';

import './index.scss'
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const allItems = [
    getItem('首页', '/', <PieChartOutlined />),
    getItem('数据大屏', '/screen', <DesktopOutlined />),
    getItem('权限管理', '/acl', <ContainerOutlined />, [
        getItem('用户管理', '/acl/user'),
        getItem('角色管理', '/acl/role'),
        getItem('菜单管理', '/acl/permission'),
    ]),
    getItem('商品管理', '/product', <AppstoreOutlined />, [
        getItem('品牌管理', '/product/trademark'),
        getItem('属性管理', '/product/attr'),
        getItem('SPU管理', '/product/spu'),
        getItem('SKU管理', '/product/sku')
    ])
];

const Menu1 = () => {
    const { userInfo } = useSelector((state) => state.user)
    const { routes } = useSelector((state) => state.user.userInfo)
    console.log(userInfo.routes)
    console.log(routes)
    const navigate = useNavigate()
    // const filterItems = (items, routes) => {
    //     return items.filter(item => {
    //         if (item.children) {
    //             item.children = filterItems(item.children, routes);
    //             return item.children.length > 0;
    //         }
    //         return routes.some(route => item.key.endsWith(route));
    //     });
    // };
    // const filteredItems = useMemo(() => filterItems(allItems, routes), [routes]);
    const handler = (value) => {
        navigate(value.key)
    }
    return (
        <div
            className='menu'
        >
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                items={allItems}
                onSelect={handler}
                className='menu_top'
            />
        </div>
    );
};
export default Menu1;
