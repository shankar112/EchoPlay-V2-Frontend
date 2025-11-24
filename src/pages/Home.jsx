import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader';
import FeaturedCarousel from '../components/FeaturedCarousel';
import Logo from '../components/Logo';
import { motion } from 'framer-motion';
import { FaPlay, FaBars, FaTimes } from 'react-icons/fa';
import AudioContext from '../context/AudioContext';

function Home() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const { playTrack } = useContext(AudioContext);

  const [tracks, setTracks] = useState([]);
  const [fetchError, setFetchError] = useState('');
  const [view, setView] = useState('global');
  const [isFetching, setIsFetching] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
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

  // Play the song without navigating
  const handlePlay = (e, track) => {
    e.stopPropagation();
    playTrack(track);
  };

  // Navigate to detail page
  const handleCardClick = (id) => {
    navigate(`/track/${id}`);
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
          {/* Logo Header Section */}
          <div className="logo-header">
            <Logo width={50} height={50} />
            <div>
              <h1 style={{ fontSize: '1.8rem', marginBottom: '0', margin: '0' }}>EchoPlay</h1>
              <p style={{ margin: 0, color: '#b3b3b3', fontSize: '0.9rem' }}>Welcome back, {user.username}</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <select value={view} onChange={(e) => setView(e.target.value)}>
              <option value="global">Global Feed</option>
              <option value="mine">My Uploads</option>
            </select>

            <Link to="/upload" className="auth-button" style={{ textDecoration: 'none' }}>Upload</Link>
            <button onClick={handleLogout} className="auth-button" style={{ backgroundColor: '#333', color: 'white' }}>Log Out</button>
          </div>

          {/* Mobile Hamburger Menu */}
          <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Mobile Menu */}
          <motion.div
            className={`mobile-menu ${menuOpen ? 'open' : ''}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -20 }}
            transition={{ duration: 0.2 }}
          >
            <select
              value={view}
              onChange={(e) => {
                setView(e.target.value);
                setMenuOpen(false);
              }}
              className="mobile-select"
            >
              <option value="global">Global Feed</option>
              <option value="mine">My Uploads</option>
            </select>

            <Link
              to="/upload"
              className="auth-button mobile-menu-btn"
              style={{ textDecoration: 'none', width: '100%', textAlign: 'center' }}
              onClick={() => setMenuOpen(false)}
            >
              Upload
            </Link>
            
            <button
              onClick={handleLogout}
              className="auth-button mobile-menu-btn"
              style={{ backgroundColor: '#333', color: 'white', width: '100%' }}
            >
              Log Out
            </button>
          </motion.div>
        </header>

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
                  onClick={() => handleCardClick(track._id)} // Go to Detail Page
                  style={{ cursor: 'pointer', position: 'relative' }}
                  whileHover={{ scale: 1.03 }}
                  className="song-card-wrapper"
                >
                  <SongCard track={track} />
                  
                  {/* Floating Play Button (Visible on Hover via CSS) */}
                  <button
                    className="card-play-btn"
                    onClick={(e) => handlePlay(e, track)}
                  >
                    <FaPlay />
                  </button>
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