// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import Logo from '../components/Logo';
import './AuthForm.css'; // Import our new styles

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to redirect the user

  // This function updates the state when you type
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // This function runs when you click "Sign Up"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from reloading
    setError(''); // Clear old errors

    try {
      // Use our apiClient to send a POST request
      const response = await apiClient.post('/api/auth/register', formData);

      // We'll learn to save the token later
      console.log('Registration successful:', response.data);
      
      // Send the user to the login page after success
      navigate('/login');

    } catch (err) {
      // If the API sends an error (like "User already exists")
      console.error('Registration error:', err.response.data);
      setError(err.response.data.msg || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Logo Section */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Logo width={60} height={60} />
        </div>

        <h1>Sign up for EchoPlay</h1>
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

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
            minLength="6"
            required
          />
        </div>

        <button type="submit" className="auth-button">
          Sign Up
        </button>

        <p className="auth-switch-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;