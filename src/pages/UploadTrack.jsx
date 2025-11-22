// src/pages/UploadTrack.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import './AuthForm.css'; // Re-using our form styles

function UploadTrack() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // We store text inputs here
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    duration: '',
  });

  // We store file inputs separately
  const [files, setFiles] = useState({
    trackFile: null,
    coverArt: null,
  });

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    // Safety check: ensure a file was actually selected
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 1. Create a FormData object
    const data = new FormData();
    data.append('title', formData.title);
    data.append('artist', formData.artist);
    data.append('album', formData.album);
    data.append('duration', formData.duration);
    data.append('trackFile', files.trackFile);
    data.append('coverArt', files.coverArt);

    try {
      // 2. Send the POST request
      // CRITICAL FIX: We pass a config object as the 3rd argument.
      // Setting Content-Type to 'multipart/form-data' allows axios to let the browser
      // set the correct boundary string automatically.
      await apiClient.post('/api/tracks', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log('Upload successful!');
      navigate('/'); // Redirect to Home to see the new song
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.response?.data?.msg || 'Failed to upload track.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Upload New Track</h1>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <div className="form-group">
          <label>Title</label>
          <input name="title" type="text" required onChange={handleTextChange} />
        </div>

        <div className="form-group">
          <label>Artist</label>
          <input name="artist" type="text" required onChange={handleTextChange} />
        </div>

        <div className="form-group">
          <label>Album</label>
          <input name="album" type="text" onChange={handleTextChange} />
        </div>

        <div className="form-group">
          <label>Duration (seconds)</label>
          <input name="duration" type="number" required onChange={handleTextChange} />
        </div>

        <div className="form-group">
          <label>MP3 File</label>
          <input 
            name="trackFile" 
            type="file" 
            accept="audio/mpeg, audio/mp3" 
            required 
            onChange={handleFileChange} 
            style={{ color: 'white' }}
          />
        </div>

        <div className="form-group">
          <label>Cover Art (Image)</label>
          <input 
            name="coverArt" 
            type="file" 
            accept="image/*" 
            required 
            onChange={handleFileChange}
            style={{ color: 'white' }}
          />
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Track'}
        </button>
      </form>
    </div>
  );
}

export default UploadTrack;