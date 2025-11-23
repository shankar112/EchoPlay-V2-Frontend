// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useOutletContext } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader'; // New Loader
import FeaturedCarousel from '../components/FeaturedCarousel'; // New Carousel
import { motion } from 'framer-motion'; // For smooth entry

function Home() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const { setCurrentTrack } = useOutletContext() || {}; 

  const [tracks, setTracks] = useState([]);
  const [fetchError, setFetchError] = useState('');
  const [view, setView] = useState('global'); 
  const [isFetching, setIsFetching] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchTracks = async () => {
      setIsFetching(true); 
      setFetchError('');
      try {
        const endpoint = view === 'global' ? '/api/tracks' : '/api/tracks/my-tracks';
        const response = await apiClient.get(endpoint);
        setTracks(response.data);
      } catch (err) {
        console.error('Error fetching tracks:', err);
        setFetchError('Failed to load songs.');
      } finally {
        setIsFetching(false);
      }
    };

    if (user) {
      fetchTracks();
    }
  }, [user, view]);

  const handlePlay = (track) => {
    if (setCurrentTrack) {
      setCurrentTrack(track);
    }
  };

  if (loading) return <Loader text="Authenticating..." />;

  if (user) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <header>
          <h1>Welcome, {user.username}.</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <select 
              value={view} 
              onChange={(e) => setView(e.target.value)}
            >
              <option value="global">Global Feed</option>
              <option value="mine">My Uploads</option>
            </select>

            <Link to="/upload" className="auth-button" style={{ textDecoration: 'none' }}>
              Upload
            </Link>
            
            <button onClick={handleLogout} className="auth-button" style={{ backgroundColor: '#333', color: 'white' }}>
              Log Out
            </button>
          </div>
        </header>

        {/* FEATURED CAROUSEL (Only show on Global view) */}
        {view === 'global' && !isFetching && tracks.length > 0 && (
          <section style={{ marginBottom: '50px' }}>
            <FeaturedCarousel tracks={tracks} />
          </section>
        )}

        <div className="song-list-container">
          <h2>{view === 'global' ? 'Recent Uploads' : 'My Personal Library'}</h2>
          
          {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}

          {isFetching ? (
            <Loader text="Loading your tracks..." />
          ) : tracks.length === 0 ? (
             <p style={{ marginTop: '20px', color: '#bbb' }}>
               {view === 'global' ? "No songs yet." : "You haven't uploaded any songs yet."}
             </p>
          ) : (
            <div className="song-grid">
              {tracks.map((track) => (
                <motion.div 
                  key={track._id} 
                  onClick={() => handlePlay(track)} 
                  style={{ cursor: 'pointer' }}
                  whileHover={{ scale: 1.03 }} // Smooth hover effect
                > 
                  <SongCard track={track} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to EchoPlay</h1>
      <p>The best place to share and discover indie music.</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/login" className="auth-button" style={{ marginRight: '10px' }}>Log In</Link>
        <Link to="/register" className="auth-button" style={{ backgroundColor: 'white', color: 'black' }}>Sign Up</Link>
      </div>
    </div>
  );
}

export default Home;