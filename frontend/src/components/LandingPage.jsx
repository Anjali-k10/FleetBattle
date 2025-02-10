import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate('/create-room');
  };

  const handleJoinRoom = () => {
    navigate('/join-room');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 p-4">
      {/* Fleet Battle Title with Animation */}
      <h1 className="text-4xl font-semibold mb-8 text-blue-600 animate__animated animate__fadeInDown animate__delay-1s">
        Fleet Battle
      </h1>

      {/* Buttons with Animation */}
      <div className="space-y-4 animate__animated animate__fadeInUp animate__delay-2s">
        <button
          className="bg-blue-600 text-white mx-4 p-4 rounded-lg w-64 transform transition-all duration-500 ease-in-out hover:scale-105"
          onClick={handleCreateRoom}
        >
          Create Room
        </button>
        <button
          className="bg-blue-600 text-white mx-4 p-4 rounded-lg w-64 transform transition-all duration-500 ease-in-out hover:scale-105"
          onClick={handleJoinRoom}
        >
          Join Existing Room
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
