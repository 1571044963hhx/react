import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import LazyLoadComponent from "@/components/LazyLoadComponent";

// import Home from "../pages/home";
//一级路由
import Login from "@/pages/login";
import Error from "@/pages/404";
import Screen from "@/pages/screen";
import Layout from "@/pages/layout";

// import Acl from "@/pages/acl";
// import Product from "@/pages/product";


//二级路由(product)
import Attr from "@/pages/product/attr";
import Sku from "@/pages/product/sku";
import Spu from "@/pages/product/spu";
import Trademark from "@/pages/product/trademark";
//二级路由(acl)
// import Permission from "@/pages/acl/permission";
// import Role from "@/pages/acl/role";
// import User from "@/pages/acl/user";
const Permission = lazy(() => import('@/pages/acl/permission'))
const Role = lazy(() => import('@/pages/acl/role'))
const User = lazy(() => import('@/pages/acl/user'))




const constantRoutes = [
    {
        path: '/',
        element: <Layout />
    },
    {
        path: '/screen',
        element: <Screen />
    },
    {
        path: '/404',
        element: <Error />
    },
    {
        path: '/login',
        element: <Login />
    }
]
const asyncRoutes = [
    {
        path: "/acl",
        element: <Layout />,
        name: "权限管理",
        children: [
            {
                path: "permission",
                element: <LazyLoadComponent Component={Permission} />,
                name: "菜单管理"
            },
            {
                path: "user",
                element: <LazyLoadComponent Component={User} />,
                name: "用户管理"
            },
            {
                path: "role",
                element: <LazyLoadComponent Component={Role} />,
                name: "角色管理"
            },
            {
                index: true,
                element: <Navigate to="role" replace />
            },
        ]
    },
    {
        path: "/product",
        element: <Layout />,
        name: "商品管理",
        children: [
            {
                path: "attr",
                element: <Attr />,
                name: "属性管理"
            },
            {
                path: "spu",
                element: <Spu />,
                name: "SPU管理"
            },
            {
                path: "sku",
                element: <Sku />,
                name: "SKU管理"
            },
            {
                path: "trademark",
                element: <Trademark />,
                name: "品牌管理"
            },
            {
                index: true,
                element: <Navigate to="spu" replace />
            }
        ]
    }
]


const router = createBrowserRouter([...asyncRoutes, ...constantRoutes])

export { router, constantRoutes, asyncRoutes }


