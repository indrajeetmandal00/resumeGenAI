import React, { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const register = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const { loading, handleRegister } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted without reloading the page!");
    await handleRegister(username, email, password);
    navigate('/');
  };

  if (loading) return <h1>Loading...</h1>

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="input">
          <div className="inputBox">
            <label>Username</label>
            <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="johndoe" />
          </div>
          <div className="inputBox">
            <label>E-mail</label>
            <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="example@xyz.com" />
          </div>
          <div className="inputBox">
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="······" />
          </div>
          <div className="inputBox">
            <input type="submit" value="Sign up" />
          </div>
        </div>
        <p className="forget">Already have an account? <Link to="/login"><span style={{ color: '#ff0047', textShadow: '0 0 10px rgba(255, 0, 71, 0.8)' }}>Login</span></Link></p>
      </form>
    </div>
  )
}

export default register
