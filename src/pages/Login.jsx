// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- 1. IMPORT USEAUTH
import Logo from '../components/Logo';
import './AuthForm.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- 2. GET THE LOGIN FUNCTION

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 3. CALL THE CONTEXT LOGIN FUNCTION
      await login(formData.email, formData.password);
      
      console.log('Login successful');
      navigate('/'); // Redirect to home

    } catch (err) {
      console.error('Login error:', err.response.data);
      setError(err.response.data.msg || 'Login failed. Please try again.');
    }
  };

  // ... (the rest of your return/JSX is unchanged) ...
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Logo Section */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Logo width={60} height={60} />
        </div>

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