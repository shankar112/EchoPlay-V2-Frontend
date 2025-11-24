// src/App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Player from './components/Player';
import './App.css';

function App() {
  return (
    <div className="App">
      <main className="App-content">
        <Outlet />
      </main>
      <Player />
    </div>
  );
}

export default App;