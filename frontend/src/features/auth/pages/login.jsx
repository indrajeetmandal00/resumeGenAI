import React from 'react'
import './login.css'
import { Link } from 'react-router'

const login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted without reloading the page!");
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input">
          <div className="inputBox">
            <label>E-mail</label>
            <input type="text" placeholder="example@xyz.com" />
          </div>
          <div className="inputBox">
            <label>Password</label>
            <input type="password" placeholder="······" />
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
