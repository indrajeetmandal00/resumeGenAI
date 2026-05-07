import {createBrowserRouter} from "react-router"
import App from "./App"
import Login from "./features/auth/pages/login"
import Register from "./features/auth/pages/register"
import NotFound from "./features/auth/pages/notFound"

import Protected from "./features/auth/components/protected"

export const router=createBrowserRouter([

    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path: "*",
        element: <NotFound />
    },
    {
        path:"/",
        element:<Protected><h1>Home</h1></Protected>
    }

]);