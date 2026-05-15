import { createBrowserRouter } from "react-router"
import App from "./App"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import NotFound from "./features/auth/pages/NotFound"

import Protected from "./features/auth/components/Protected"
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
        element: (      //bcz it is protected, opening / will redirect to /login
            <Protected>
                <Home />
            </Protected>
        )
    },
    {
        path: "/interview/:id",
        element: (
            <Protected>
                <Interview />
            </Protected>
        )
    }

]);