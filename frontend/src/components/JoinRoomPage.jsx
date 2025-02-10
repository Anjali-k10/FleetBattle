import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Backend URL

const JoinRoomPage = () => {
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for join confirmation or error
    socket.on('roomJoined', (id) => {
      navigate(`/waiting-room/${id}`); // Navigate to waiting room
    });

    socket.on('joinError', (message) => {
      setError(message);
    });

    return () => {
      socket.off('roomJoined');
      socket.off('joinError');
    };
  }, [navigate]);

  const handleJoinRoom = () => {
    if (roomId.trim() === '') {
      setError('Please enter a valid Room ID.');
      return;
    }
    socket.emit('joinRoom', roomId); // Send request to join room
    setError(''); // Clear previous error
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 p-4 space-y-6">
      <h1 className="text-4xl font-semibold text-blue-600">Join Room</h1>

      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="p-3 border rounded-lg w-64 text-center"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        onClick={handleJoinRoom}
      >
        Join Game
      </button>
    </div>
  );
};

export default JoinRoomPage;
