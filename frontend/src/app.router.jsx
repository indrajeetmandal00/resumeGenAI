import { createBrowserRouter } from "react-router"
import App from "./App"
import Login from "./features/auth/pages/login"
import Register from "./features/auth/pages/register"
import NotFound from "./features/auth/pages/notFound"

import Protected from "./features/auth/components/protected"
import Home from "./features/interview/pages/Home"
import Interview from "./features/interview/pages/Interview"

export const router = createBrowserRouter([

    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "*",
        element: <NotFound />
    },
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/interview/:id",
        element: <Interview />
    }

]);