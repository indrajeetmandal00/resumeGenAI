import React, { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const login = () => {

  const { loading, handlelogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmit = async (e) => {     //ui below stays clean and takes the data and performs handlelogin
    e.preventDefault();
    console.log("Form submitted without reloading the page!");
    await handlelogin({ email, password });
    navigate('/');    //after sucessful login get back to home /


  }
  if (loading) return <h1>Loading...</h1>

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input">
          <div className="inputBox">
            <label>E-mail</label>
            <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="example@xyz.com" />
          </div>
          <div className="inputBox">
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="······" />
          </div>
          <div className="inputBox">
            <input type="submit" value="Sign in" />
          </div>
        </div>
        <p className="forget">New User? <Link to="/register"><span style={{ color: '#ff0047', textShadow: '0 0 10px rgba(255, 0, 71, 0.8)' }}>Register</span></Link></p>
      </form>
    </div>
  )
}

export default login
