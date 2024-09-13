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

import Home from "@/pages/home";

//二级路由(product)
import Attr from "@/pages/product/attr";
import Sku from "@/pages/product/sku";
import Spu from "@/pages/product/spu";
import Trademark from "@/pages/product/trademark";
//二级路由(acl)
// import Permission from "@/pages/acl/permission";
// import Role from "@/pages/acl/role";
// import User from "@/pages/acl/user";

//全局守卫
import NavigationGuards from "@/components/RouteGuard";
const Permission = lazy(() => import('@/pages/acl/permission'))
const Role = lazy(() => import('@/pages/acl/role'))
const User = lazy(() => import('@/pages/acl/user'))

const constantRoutes = [
    {
        path: '/',
        element: <NavigationGuards><Layout /></NavigationGuards>,
        name: 'layout',
        children: [
            {
                path: '/home',
                element: <NavigationGuards><Home /></NavigationGuards>,
                name: 'home'
            },
            {
                index: true,
                element: <Navigate to="home" replace />
            }
        ]
    },
    {
        path: '/screen',
        element: <NavigationGuards><Screen /></NavigationGuards>
    },
    {
        path: '/login',
        element: <NavigationGuards><Login /></NavigationGuards>
    },
    {
        path: '/*',
        element: <Error />
    }
]
const asyncRoutes = [
    {
        path: "/acl",
        element: <NavigationGuards><Layout /></NavigationGuards>,
        name: "Acl",
        children: [
            {
                path: "permission",
                element: <LazyLoadComponent Component={Permission} />,
                name: "Permission"
            },
            {
                path: "user",
                element: <LazyLoadComponent Component={User} />,
                name: "User"
            },
            {
                path: "role",
                element: <LazyLoadComponent Component={Role} />,
                name: "Role"
            },
            {
                index: true,
                element: <Navigate to="role" replace />
            },
        ]
    },
    {
        path: "/product",
        element: <NavigationGuards><Layout /></NavigationGuards>,
        name: "Product",
        children: [
            {
                path: "attr",
                element: <Attr />,
                name: "Attr"
            },
            {
                path: "spu",
                element: <Spu />,
                name: "Spu"
            },
            {
                path: "sku",
                element: <Sku />,
                name: "Sku"
            },
            {
                path: "trademark",
                element: <Trademark />,
                name: "Trademark"
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


