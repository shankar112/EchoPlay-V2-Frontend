// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // <-- IMPORT

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // --- PROTECTED ROUTES ---
      // We wrap our protected pages (like Home) inside this special route.
      // If a user isn't logged in, ProtectedRoute will send them to /login.
      {
        element: <ProtectedRoute />, 
        children: [
          { path: '/', element: <Home /> },
          // You can add more protected pages here later!
          // { path: '/profile', element: <Profile /> },
        ],
      },
      
      // --- PUBLIC ROUTES ---
      // These pages are open to everyone.
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* We wrap everything in AuthProvider so our whole app knows if we're logged in */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);