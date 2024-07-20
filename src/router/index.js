import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/home";
import Login from "@/pages/login";
import Product from "@/pages/product";
import Error from "@/pages/404";
import Acl from "@/pages/acl";
import Screen from "@/pages/screen";
import  Layout  from "@/pages/layout";



const router = createBrowserRouter([
    {
        path: '/layout',
        element: <Layout/>
    },
    // {
    //     path: '/home',
    //     element: <Home />,
    //     children: [
    //         {
    //             path: 'product',
    //             element: <Product />
    //         },
    //         {
    //             path: 'acl',
    //             element: <Acl />
    //         }
    //     ]

    // },
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
])

export default router