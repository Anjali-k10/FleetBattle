import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

const GameEntryPage = () => {
  const [gameCode, setGameCode] = useState('');
  const navigate = useNavigate();

  const handleJoinGame = () => {
    // Normally, you would validate the game code here (e.g., by sending it to the backend)
    navigate('/game'); // Redirect to the game page after successful join
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-3xl font-semibold mb-4">Join Room</h1>
      <input
        type="text"
        value={gameCode}
        onChange={(e) => setGameCode(e.target.value)}
        placeholder="Enter Game Code"
        className="px-4 py-2 border-2 border-gray-300 rounded-md mb-4"
      />
      <button
        onClick={handleJoinGame}
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Join Game
      </button>
    </div>
  );
};

export default GameEntryPage;

