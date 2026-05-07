import { useAuth } from "../hooks/useAuth";
import React from 'react'
import { Navigate } from 'react-router'

const Protected = ({ children }) => {       //children wrapped by protected in app.router.js will be accessible only after login.
    const { loading, user } = useAuth();

    if (loading) return <h1>Loading...</h1>
    if (!user) {
        return <Navigate to="/login" />     //redirect to login
    }
    return children
}


export default Protected
