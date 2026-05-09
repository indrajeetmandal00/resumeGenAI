import React from 'react'
import {Router, RouterProvider} from "react-router"
import {router} from "./app.router.jsx"
import { AuthContextProvider } from './features/auth/state/auth.context.jsx'
import { InterviewProvider } from './features/interview/state/interview.context.jsx'


const App = () => {
  return (
    

    <AuthContextProvider>

     <InterviewProvider>  
       <RouterProvider router={router}/>
    </InterviewProvider>

    </AuthContextProvider>
  )
}

export default App
