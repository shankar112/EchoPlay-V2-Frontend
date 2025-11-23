// src/pages/TrackDetail.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaArrowLeft, FaVolumeUp } from 'react-icons/fa';

const TrackDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  useOutletContext();
  
  const audioRef = useRef(null);
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

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
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const time = e.target.value;
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolume = (e) => {
    const vol = e.target.value;
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const formatTime = (time) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (loading) return <Loader text="Loading Track Details..." />;
  if (!track) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Track not found</h2>;

  // Build Image URL (Handles both Cloudinary URLs and relative paths)
  let imageUrl = track.coverArtPath;
  if (track.coverArtPath && track.coverArtPath.startsWith('/')) {
    imageUrl = `${apiClient.defaults.baseURL}${track.coverArtPath}`;
  }

  // Fallback image if load fails
  const fallbackImage = "https://placehold.co/400?text=Music";

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
        style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px', fontSize: '1rem' }}
      >
        <FaArrowLeft /> Back
      </button>

      {/* Album Art with Beat Pulse Animation */}
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ marginBottom: '30px', position: 'relative' }}
      >
        <img 
          src={imageUrl} 
          alt={track.title} 
          style={{ width: '300px', height: '300px', borderRadius: '20px', objectFit: 'cover', boxShadow: '0 20px 50px rgba(29, 185, 84, 0.3)' }}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = fallbackImage;
          }}
        />
      </motion.div>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center', fontWeight: '800' }}>{track.title}</h1>
      <h3 style={{ color: '#b3b3b3', marginBottom: '30px', fontSize: '1.2rem' }}>{track.artist} • {track.album || 'Single'}</h3>

      <button 
        onClick={handlePlay} 
        className="auth-button" 
        style={{ fontSize: '1.1rem', padding: '15px 40px', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        {isPlaying ? <FaPause /> : <FaPlay />} 
        {isPlaying ? 'Pause' : 'Play Now'}
      </button>

      {/* Mini Audio Player - Only shown when playing */}
      {isPlaying && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{ 
            marginTop: '30px', 
            width: '100%', 
            maxWidth: '500px', 
            background: 'rgba(29, 185, 84, 0.1)',
            padding: '20px',
            borderRadius: '15px',
            border: '1px solid rgba(29, 185, 84, 0.3)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Progress Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <span style={{ fontSize: '0.85rem', color: '#b3b3b3', minWidth: '40px' }}>{formatTime(currentTime)}</span>
            <input 
              type="range" 
              min="0" 
              max={duration || 0} 
              value={currentTime} 
              onChange={handleSeek}
              style={{ 
                flex: 1,
                height: '6px',
                borderRadius: '3px',
                background: 'rgba(255,255,255,0.2)',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
            <span style={{ fontSize: '0.85rem', color: '#b3b3b3', minWidth: '40px', textAlign: 'right' }}>{formatTime(duration)}</span>
          </div>

          {/* Volume Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaVolumeUp style={{ color: '#1db954', fontSize: '0.95rem' }} />
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01"
              value={volume}
              onChange={handleVolume}
              style={{ 
                flex: 1,
                height: '4px',
                borderRadius: '2px',
                background: 'rgba(255,255,255,0.2)',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        src={track?.filePath} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

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