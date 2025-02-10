import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import JoinRoomPage from './components/JoinRoomPage';
import GamePage from './components/GamePage'; // You can define this later
import LandingPage from './components/LandingPage';
import CreateRoomPage from './components/CreateRoomPage';
import WaitingRoom from './components/WaitingRoom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-room" element={<CreateRoomPage />} />
        <Route path="/join-room" element={<JoinRoomPage />} />
        <Route path="/game/:roomId" element={<GamePage />} /> {/* Game Page route */}
        <Route path="/waiting-room/:roomId" element={<WaitingRoom />} />
      </Routes>
    </Router>
  );
}

export default App;


