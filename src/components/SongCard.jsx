// src/components/SongCard.jsx
import React from 'react';
import apiClient from '../api/axiosConfig';

function SongCard({ track }) {
  // Logic to build the image URL
  let imageUrl = track.coverArtPath;

  // If it's a relative path (starts with /), add the backend URL
  if (track.coverArtPath && track.coverArtPath.startsWith('/')) {
    imageUrl = `${apiClient.defaults.baseURL}${track.coverArtPath}`;
  }

  // Placeholder image (a generic music icon) if image fails
  const placeholderImage = "https://placehold.co/400?text=Music";

  return (
    <div className="song-card">
      <img 
        src={imageUrl} 
        alt={track.title} 
        className="song-image"
        // If the image fails to load, switch to placeholder
        onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
      />
      <div className="song-info">
        <h3>{track.title}</h3>
        <p>{track.artist}</p>
      </div>
    </div>
  );
}

export default SongCard;