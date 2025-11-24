// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import UploadTrack from './pages/UploadTrack.jsx';
import TrackDetail from './pages/TrackDetail.jsx'; // Keep this!

import './index.css';

import { AudioProvider } from './context/AudioContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/upload', element: <UploadTrack /> },
          { path: '/track/:id', element: <TrackDetail /> }, // Dynamic Route for details
        ],
      },
      // Public Routes
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AudioProvider>
        <RouterProvider router={router} />
      </AudioProvider>
    </AuthProvider>
  </React.StrictMode>
);