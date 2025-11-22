// src/components/Player.jsx
import React, { useRef, useEffect, useState } from 'react';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa'; // Import icons
import '../App.css'; 

function Player({ currentTrack }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // Reset state when track changes
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Playback failed:", err));
    }
  }, [currentTrack]);

  // Handle Play/Pause Click
  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Update progress bar as song plays
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Set duration when song loads
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Handle user dragging the progress bar
  const handleSeek = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Handle Volume Change
  const handleVolume = (e) => {
    const vol = e.target.value;
    setVolume(vol);
    audioRef.current.volume = vol;
  };

  // Helper to format time (e.g., 125s -> 2:05)
  const formatTime = (time) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

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
      </div>

      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        src={currentTrack.filePath} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}

export default Player;