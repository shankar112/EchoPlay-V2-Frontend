// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useOutletContext } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import SongCard from '../components/SongCard';

function Home() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  
  // --- GET THE PLAY FUNCTION ---
  // We grab 'setCurrentTrack' from the Outlet context
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

  // Function to handle clicking a song
  const handlePlay = (track) => {
    if (setCurrentTrack) {
      console.log("Playing track:", track.title);
      setCurrentTrack(track); // <--- This starts the music
    } else {
      console.error("Player context not found!");
    }
  };

  if (loading) return <h1>Loading...</h1>;

  if (user) {
    return (
      <div>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <h1>Welcome, {user.username}!</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <select 
              value={view} 
              onChange={(e) => setView(e.target.value)}
              style={{ padding: '10px 15px', borderRadius: '20px', backgroundColor: '#333', color: 'white', border: '1px solid #555', cursor: 'pointer', fontSize: '1rem', outline: 'none' }}
            >
              <option value="global">Global Feed</option>
              <option value="mine">My Uploads</option>
            </select>

            <Link to="/upload" className="auth-button" style={{ textDecoration: 'none', marginTop: 0 }}>
              Upload Music
            </Link>
            
            <button onClick={handleLogout} className="auth-button" style={{ backgroundColor: '#333', color: 'white', marginTop: 0 }}>
              Log Out
            </button>
          </div>
        </header>

        <div className="song-list-container">
          <h2>{view === 'global' ? 'Global Feed' : 'My Personal Library'}</h2>
          
          {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}

          {isFetching ? (
            <p style={{ color: '#888' }}>Loading songs...</p>
          ) : tracks.length === 0 ? (
             <p style={{ marginTop: '20px', color: '#bbb' }}>
               {view === 'global' ? "No songs yet." : "You haven't uploaded any songs yet."}
             </p>
          ) : (
            <div className="song-grid">
              {tracks.map((track) => (
                // WRAP THE CARD IN A CLICK HANDLER
                <div key={track._id} onClick={() => handlePlay(track)} style={{ cursor: 'pointer' }}> 
                  <SongCard track={track} />
                </div>
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