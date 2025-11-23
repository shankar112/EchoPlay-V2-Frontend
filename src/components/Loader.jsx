// src/components/Loader.jsx
import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const Loader = ({ text = "Loading..." }) => {
  return (
    <motion.div 
      className="loader-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      exit={{ opacity: 0 }}
    >
      {/* Spinner Container */}
      <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Outer rotating ring */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '80px',
            height: '80px',
            border: '3px solid rgba(29, 185, 84, 0.2)',
            borderTop: '3px solid #1db954',
            borderRadius: '50%',
            position: 'absolute'
          }}
        />
        
        {/* Inner rotating ring (opposite direction) */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '60px',
            height: '60px',
            border: '2px solid rgba(29, 185, 84, 0.15)',
            borderRight: '2px solid #1db954',
            borderRadius: '50%',
            position: 'absolute'
          }}
        />
        
        {/* Center dot */}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#1db954',
            boxShadow: '0 0 15px rgba(29, 185, 84, 0.6)'
          }}
        />
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ 
          color: '#b3b3b3', 
          letterSpacing: '2px',
          fontSize: '1rem',
          marginTop: '40px',
          fontWeight: 500
        }}
      >
        {text}
      </motion.p>

      {/* Animated dots */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ y: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ 
              duration: 0.8, 
              repeat: Infinity,
              delay: i * 0.1
            }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#1db954'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Loader;