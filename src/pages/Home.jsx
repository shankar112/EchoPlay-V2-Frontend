// src/pages/Home.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext'; // <-- 1. IMPORT USEAUTH
import { useNavigate } from 'react-router-dom';

function Home() {
  const { user, loading, logout } = useAuth(); // <-- 2. GET STATE
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  // 3. Show a loading message
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // 4. Show the user's info if they are logged in
  if (user) {
    return (
      <div>
        <h1>Welcome, {user.username}!</h1>
        <p>Your email is: {user.email}</p>
        <button onClick={handleLogout} className="auth-button">
          Log Out
        </button>
      </div>
    );
  }

  // 5. If no user and not loading, show a welcome message
  return (
    <div>
      <h1>Welcome to EchoPlay</h1>
      <p>Please <a href="/login">log in</a> or <a href="/register">register</a>.</p>
    </div>
  );
}

export default Home;