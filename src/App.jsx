// src/App.jsx
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Import useLocation
import Player from './components/Player';
import './App.css';

function App() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const location = useLocation(); // Get current route

  // Check if we are on the Detail Page
  const isDetailPage = location.pathname.startsWith('/track/');

  return (
    <div className="App">
      <main className="App-content">
        <Outlet context={{ setCurrentTrack }} />
      </main>
      
      {/* Only show bottom player if NOT on detail page AND a track is selected */}
      {!isDetailPage && <Player currentTrack={currentTrack} />}
    </div>
  );
}

export default App;