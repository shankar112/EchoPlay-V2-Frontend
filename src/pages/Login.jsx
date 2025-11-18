// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import './AuthForm.css'; // We re-use the same styles!

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to redirect

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Call the LIVE login endpoint
      const response = await apiClient.post('/api/auth/login', formData);

      // --- THIS IS THE NEW, IMPORTANT PART ---
      // 1. Get the token from the response
      const { token } = response.data;

      // 2. Save the token in the browser's storage
      localStorage.setItem('token', token);

      // 3. Set the token in our API client for all future requests
      apiClient.defaults.headers.common['x-auth-token'] = token;
      // ------------------------------------------

      console.log('Login successful:', response.data.msg);

      // 4. Send the user to the Home page
      navigate('/');

    } catch (err) {
      console.error('Login error:', err.response.data);
      setError(err.response.data.msg || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Log in to EchoPlay</h1>
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="auth-button">
          Log In
        </button>

        <p className="auth-switch-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;