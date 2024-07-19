import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Login from "@/pages/login";
import Product from "@/pages/product";
import Error from "@/pages/404";
import Acl from "@/pages/acl";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: 'product',
                element: <Product />
            },
            {
                path: 'acl',
                element: <Acl />
            }
        ]
    },
    {
        path: '/404',
        element: <Error />
    },
    {
        path: '/Login',
        element: <Login />
    }
])

export default router