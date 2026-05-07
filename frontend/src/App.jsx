import React from 'react'
import {Router, RouterProvider} from "react-router"
import {router} from "./app.router.jsx"
import { AuthContextProvider } from './features/auth/state/auth.context.jsx'



const App = () => {
  return (

    <AuthContextProvider>
    <RouterProvider router={router}/>
    </AuthContextProvider>
  )
}

export default App
