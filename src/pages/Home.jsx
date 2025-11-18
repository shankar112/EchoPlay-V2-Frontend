// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import SongCard from '../components/SongCard'; // Import the card

function Home() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  
  // State to store our songs
  const [tracks, setTracks] = useState([]);
  const [fetchError, setFetchError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Fetch songs when the component mounts
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await apiClient.get('/api/tracks');
        setTracks(response.data);
      } catch (err) {
        console.error('Error fetching tracks:', err);
        setFetchError('Failed to load songs.');
      }
    };

    if (user) {
      fetchTracks();
    }
  }, [user]);

  if (loading) return <h1>Loading...</h1>;

  if (user) {
    return (
      <div>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>Welcome, {user.username}!</h1>
          <div>
            <Link to="/upload" className="auth-button" style={{ marginRight: '10px', textDecoration: 'none' }}>
              Upload Music
            </Link>
            <button onClick={handleLogout} className="auth-button" style={{ backgroundColor: '#333', color: 'white' }}>
              Log Out
            </button>
          </div>
        </header>

        <div className="song-list-container">
          <h2>Your Feed</h2>
          
          {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}

          {tracks.length === 0 && !fetchError ? (
            <p>No songs yet. Upload one to get started!</p>
          ) : (
            <div className="song-grid">
              {tracks.map((track) => (
                <SongCard key={track._id} track={track} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to EchoPlay</h1>
      <p>The best place to share and discover indie music.</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/login" className="auth-button" style={{ textDecoration: 'none', marginRight: '10px' }}>Log In</Link>
        <Link to="/register" className="auth-button" style={{ textDecoration: 'none', backgroundColor: 'white', color: 'black' }}>Sign Up</Link>
      </div>
    </div>
  );
}

export default Home;