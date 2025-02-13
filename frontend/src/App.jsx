import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import JoinRoomPage from './components/JoinRoomPage';
import GamePage from './components/GamePage';
import LandingPage from './components/LandingPage';
import CreateRoomPage from './components/CreateRoomPage';
import WaitingRoom from './components/WaitingRoom';

const ProtectedRoutes = () => {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const isGameActive = localStorage.getItem("gameStarted") === "true";
    setGameStarted(isGameActive);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/create-room"
        element={gameStarted ? <Navigate to={`/game/${localStorage.getItem('roomId')}`} /> : <CreateRoomPage />}
      />
      <Route
        path="/join-room"
        element={gameStarted ? <Navigate to={`/game/${localStorage.getItem('roomId')}`} /> : <JoinRoomPage />}
      />
      <Route
        path="/waiting-room/:roomId"
        element={gameStarted ? <Navigate to={`/game/${localStorage.getItem('roomId')}`} /> : <WaitingRoom />}
      />
      <Route path="/game/:roomId" element={<GamePage />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <ProtectedRoutes />
    </Router>
  );
}

export default App;



