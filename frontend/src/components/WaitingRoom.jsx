import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Socket from "../utils/Socket";

const WaitingRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`🟡 Waiting in Room: ${roomId}`);

    Socket.on("startGame", (id) => {
      if (id === roomId) {
        console.log("🎮 Game starting...");
        navigate(`/game/${roomId}`);
      }
    });

    return () => {
      Socket.off("startGame");
    };
  }, [roomId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 p-4 space-y-6">
      <h1 className="text-3xl font-semibold text-blue-600">Waiting for Player...</h1>
      <p className="text-lg">Room ID: {roomId}</p>
    </div>
  );
};

export default WaitingRoom;
