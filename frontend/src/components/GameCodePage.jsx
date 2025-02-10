import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

const GameCodePage = () => {
  const [gameCode, setGameCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to the game page

  // Function to generate a random game code
  const generateGameCode = () => {
    setLoading(true);
    setTimeout(() => {
      const code = Math.random().toString(36).substr(2, 6).toUpperCase(); // Generate random code
      setGameCode(code);
      setLoading(false);
    }, Math.floor(Math.random() * (5000 - 2000 + 1) + 2000)); // Random delay between 2-5 seconds
  };

  // Function to handle copying the game code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(gameCode); // Copy the room code to clipboard
    alert('Room ID copied to clipboard!');
  };

  // Function to start the game and navigate to the game room with the game ID
  const handleStartGame = () => {
    if (gameCode) {
      navigate(`/game/${gameCode}`); // Pass the room code to the game page via URL
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 p-4">
      <h1 className="text-4xl font-semibold mb-6 text-blue-600">Create Room</h1>

      <button
        onClick={generateGameCode}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mb-6"
      >
        Generate Room ID
      </button>

      {loading && (
        <div className="flex justify-center items-center space-x-2 mb-6">
          <div className="w-6 h-6 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      )}

      {gameCode && !loading && (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4 text-center w-full max-w-xs">
          <p className="text-xl font-semibold text-blue-600">Room ID</p>
          <div className="text-2xl font-bold text-gray-800">{gameCode}</div>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={handleCopyCode}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Copy Room ID
            </button>
            <button
              onClick={handleStartGame}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              Start Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCodePage;

