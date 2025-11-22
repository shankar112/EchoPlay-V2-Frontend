// src/components/Player.jsx
import React, { useRef, useEffect } from 'react';
import '../App.css'; 

function Player({ currentTrack }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.play().catch(err => console.error("Playback failed:", err));
    }
  }, [currentTrack]);

  if (!currentTrack) return null; 

  const coverArt = currentTrack.coverArtPath || "https://placehold.co/50?text=Music";

  return (
    <div className="player-bar">
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

      <audio 
        ref={audioRef}
        src={currentTrack.filePath} 
        controls 
        autoPlay
        className="audio-element"
      />
    </div>
  );
}

export default Player;