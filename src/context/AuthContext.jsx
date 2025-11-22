// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create a "Provider" component
// This component will wrap our entire app and provide the auth state
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Is app still loading user?

  // This function will run once when the app first loads
  useEffect(() => {
    loadUserFromToken();
  }, []);

  const loadUserFromToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // 1. Set the token in our apiClient for all future requests
        apiClient.defaults.headers.common['x-auth-token'] = token;
        
        // 2. Fetch the user's data using the /api/auth/me route
        const response = await apiClient.get('/api/auth/me');
        
        // 3. Set the user in our global state
        setUser(response.data);
      } catch (err) {
        console.error('Failed to load user from token:', err);
        localStorage.removeItem('token'); // Invalid token, so remove it
      }
    }
    setLoading(false); // We're done loading (or failed)
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/api/auth/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('token', token);
      apiClient.defaults.headers.common['x-auth-token'] = token;

      // After logging in, load the user's data
      await loadUserFromToken(); 
      return true; // Indicate success
    } catch (err) {
      console.error('Login failed:', err);
      throw err; // Throw error to be caught by the Login form
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['x-auth-token'];
    setUser(null);
  };

  // The value we'll pass to all children
  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Create a "custom hook" to easily use the context
export function useAuth() {
  return useContext(AuthContext);
}