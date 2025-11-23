// src/components/Loader.jsx
import React from 'react';
import '../App.css';

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p style={{ color: '#888', letterSpacing: '1px' }}>{text}</p>
    </div>
  );
};

export default Loader;