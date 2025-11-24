// src/components/Player.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaVolumeUp, FaTimes, FaArrowRight } from 'react-icons/fa'; // Import icons
import AudioContext from '../context/AudioContext';
import '../App.css';

function Player() {
  const navigate = useNavigate();
  const { 
    currentTrack, 
    isPlaying, 
    currentTime, 
    duration, 
    volume, 
    togglePlay, 
    seek, 
    changeVolume,
    closePlayer
  } = useContext(AudioContext);

  // Handle user dragging the progress bar
  const handleSeek = (e) => {
    seek(e.target.value);
  };

  // Handle Volume Change
  const handleVolume = (e) => {
    changeVolume(e.target.value);
  };

  // Helper to format time (e.g., 125s -> 2:05)
  const formatTime = (time) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const navigateToTrack = () => {
    if (currentTrack) {
      navigate(`/track/${currentTrack._id}`);
    }
  }

  if (!currentTrack) return null;

  const coverArt = currentTrack.coverArtPath || "https://placehold.co/50?text=Music";

  return (
    <div className="player-bar">
      {/* 1. Song Info (Left) */}
      <div className="player-info">
        <img
          src={coverArt}
          alt="Cover"
          className="player-cover"
          onError={(e) => e.target.src = "https://placehold.co/50?text=Music"}
        />
        <div className="player-text">
          <h4>{currentTrack.title}</h4>
          <p>{currentTrack.artist}</p>
        </div>
      </div>

      {/* 2. Custom Controls (Center) */}
      <div className="player-controls">
        <button className="control-btn" onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        
        <div className="progress-container">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="progress-bar"
          />
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>

      {/* 3. Volume (Right) */}
      <div className="player-volume">
        <FaVolumeUp className="volume-icon" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
          className="volume-bar"
        />
        <button className="control-btn" onClick={navigateToTrack} style={{ marginLeft: '10px' }}>
          <FaArrowRight />
        </button>
        <button className="control-btn" onClick={closePlayer} style={{ marginLeft: '10px' }}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
}

export default Player;