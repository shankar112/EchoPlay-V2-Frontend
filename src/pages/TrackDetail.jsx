// src/pages/TrackDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import Loader from '../components/Loader';
import { motion } from 'framer-motion'; // Animation library
import { FaPlay, FaArrowLeft } from 'react-icons/fa';

const TrackDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCurrentTrack } = useOutletContext() || {};
  
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await apiClient.get(`/api/tracks/${id}`);
        setTrack(response.data);
      } catch (err) {
        console.error("Error fetching track details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrack();
  }, [id]);

  const handlePlay = () => {
    if (setCurrentTrack) setCurrentTrack(track);
  };

  if (loading) return <Loader text="Loading Track Details..." />;
  if (!track) return <h2>Track not found</h2>;

  // Build Image URL
  let imageUrl = track.coverArtPath;
  if (track.coverArtPath && track.coverArtPath.startsWith('/')) {
    imageUrl = `${apiClient.defaults.baseURL}${track.coverArtPath}`;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="track-detail-container"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}
    >
      <button 
        onClick={() => navigate(-1)} 
        style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px' }}
      >
        <FaArrowLeft /> Back
      </button>

      {/* Album Art with Beat Pulse Animation */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ marginBottom: '30px', position: 'relative' }}
      >
        <img 
          src={imageUrl} 
          alt={track.title} 
          style={{ width: '300px', height: '300px', borderRadius: '20px', objectFit: 'cover', boxShadow: '0 20px 50px rgba(29, 185, 84, 0.3)' }}
        />
      </motion.div>

      <h1 style={{ fontSize: '3rem', marginBottom: '10px', textAlign: 'center' }}>{track.title}</h1>
      <h3 style={{ color: '#b3b3b3', marginBottom: '30px' }}>{track.artist} • {track.album || 'Single'}</h3>

      <button 
        onClick={handlePlay} 
        className="auth-button" 
        style={{ fontSize: '1.2rem', padding: '15px 40px', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <FaPlay /> Play Now
      </button>

      {/* Simulated CSS Visualizer */}
      <div className="visualizer">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

    </motion.div>
  );
};

export default TrackDetail;