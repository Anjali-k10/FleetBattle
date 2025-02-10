import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your backend URL

const CreateRoomPage = () => {
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for room ID from server
    socket.on('roomCreated', (id) => {
      setRoomId(id);
      setLoading(false);
    });

    return () => {
      socket.off('roomCreated'); // Clean up the listener when component unmounts
    };
  }, []);

  const createRoom = () => {
    setLoading(true);
    socket.emit('createRoom'); // Request backend to create a room
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    alert('Room ID copied!');
  };

  const startGame = () => {
    navigate(`/waiting-room/${roomId}`); // Navigate to waiting room
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 p-4 space-y-6">
      <h1 className="text-4xl font-semibold text-blue-600">Create Room</h1>

      <button
        className="bg-blue-600 text-white p-4 rounded-lg w-64 hover:bg-blue-700 transition"
        onClick={createRoom}
        disabled={loading}
      >
        {loading ? 'Creating Room...' : 'Generate Room ID'}
      </button>

      {roomId && (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4 w-80">
          <div className="text-lg font-medium text-gray-700">Room ID: {roomId}</div>

          <div className="flex space-x-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              onClick={copyRoomId}
            >
              Copy Room ID
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={startGame}
            >
              Start Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRoomPage;


