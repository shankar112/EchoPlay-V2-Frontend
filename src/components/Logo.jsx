import React from 'react';

const Logo = ({ width = 40, height = 40, color = "#1db954" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: width }} // Prevent shrinking
    >
      {/* Outer Glow Circle */}
      <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="4" opacity="0.3" />
      
      {/* Inner Circle */}
      <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="3" />

      {/* Sound Wave Left */}
      <path d="M30 50 L30 50" stroke={color} strokeWidth="4" strokeLinecap="round">
        <animate attributeName="d" values="M30 45 L30 55; M30 35 L30 65; M30 45 L30 55" dur="1.5s" repeatCount="indefinite" />
      </path>

      {/* Sound Wave Right */}
      <path d="M70 50 L70 50" stroke={color} strokeWidth="4" strokeLinecap="round">
        <animate attributeName="d" values="M70 45 L70 55; M70 35 L70 65; M70 45 L70 55" dur="1.5s" repeatCount="indefinite" begin="0.2s" />
      </path>

      {/* Play Triangle */}
      <path 
        d="M45 35 L65 50 L45 65 Z" 
        fill={color} 
        stroke={color} 
        strokeWidth="2" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

export default Logo;