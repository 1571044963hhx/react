import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    PieChartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';


import { useNavigate } from 'react-router-dom';

import { Button, Menu } from 'antd';
import React, { useState } from 'react';
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
const items = [
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
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const navigate = useNavigate()
    const handler = (value) => {
        console.log(value)
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
                inlineCollapsed={collapsed}
                items={items}
                onSelect={handler}
                className='menu_top'
            />
            <Button type="primary" onClick={toggleCollapsed}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
        </div>
    );
};
export default Menu1;
