// src/App.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Player from './components/Player';
import './App.css';

function App() {
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <div className="App">
      <main className="App-content">
        {/* Passes the function down to ProtectedRoute -> Home */}
        <Outlet context={{ setCurrentTrack }} />
      </main>
      
      <Player currentTrack={currentTrack} />
    </div>
  );
}

export default App;