import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const WaitingRoom = () => {
  const { roomId } = useParams();
  const [players, setPlayers] = useState(1); // Initially, only one player in room
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating waiting for opponent (Real multiplayer would use WebSockets)
    const checkForOpponent = setTimeout(() => {
      setPlayers(2); // Simulate opponent joining after 5 seconds
    }, 5000);

    return () => clearTimeout(checkForOpponent);
  }, []);

  useEffect(() => {
    if (players === 2) {
      setTimeout(() => {
        navigate(`/game/${roomId}`); // Redirect to Game Page
      }, 2000); // 2-second delay before redirect
    }
  }, [players, navigate, roomId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-blue-600">Waiting Room</h1>
      <p className="text-lg text-gray-700 mt-2">Room ID: {roomId}</p>

      {players === 1 ? (
        <p className="text-lg text-gray-500 mt-4">Waiting for another player to join...</p>
      ) : (
        <div className="mt-6">
          <p className="text-xl font-bold text-green-600">Opponent Joined! Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default WaitingRoom;
