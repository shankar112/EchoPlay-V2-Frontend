// src/pages/Home.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // <-- Import Link

function Home() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <h1>Loading...</h1>;

  if (user) {
    return (
      <div>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Welcome, {user.username}!</h1>
          <div>
            {/* Link to Upload Page */}
            <Link to="/upload" className="auth-button" style={{ marginRight: '10px', textDecoration: 'none' }}>
              Upload Music
            </Link>
            <button onClick={handleLogout} className="auth-button" style={{ backgroundColor: '#333', color: 'white' }}>
              Log Out
            </button>
          </div>
        </header>

        <div className="song-list">
          {/* We will display songs here in the next step */}
          <h2>Your Feed</h2>
          <p>No songs yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to EchoPlay</h1>
      <p>Please <a href="/login">log in</a> or <a href="/register">register</a>.</p>
    </div>
  );
}

export default Home;