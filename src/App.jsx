// src/App.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  // Outlet is a placeholder from react-router-dom
  // It will render the correct page (Home, Login, or Register)
  // based on the URL.
  return (
    <div className="App">
      <main className="App-content">
        <Outlet />
      </main>
      {/* We will add our <Player /> component here later */}
    </div>
  )
}

export default App