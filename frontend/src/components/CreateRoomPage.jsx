import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "./socket";

const CreateRoomPage = () => {
  const [roomId, setRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("roomCreated", (id) => {
      console.log("✅ Room Created:", id);
      setRoomId(id);
      setLoading(false);
    });

    return () => {
      socket.off("roomCreated");
    };
  }, []);

  const createRoom = () => {
    console.log("➡️ Requesting room creation...");
    setLoading(true);
    setRoomId(null);
    socket.emit("createRoom");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId);
    alert("Room ID copied to clipboard!");
  };

  const startGame = () => {
    if (roomId) {
      navigate(`/waiting-room/${roomId}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 p-4 space-y-6">
      <h1 className="text-4xl font-semibold text-blue-600">Create Room</h1>

      <button onClick={createRoom} disabled={loading || roomId} className="bg-blue-600 text-white p-4 rounded-lg">
        {loading ? "Creating Room..." : "Generate Room ID"}
      </button>

      {roomId && (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg font-semibold">Room ID: {roomId}</p>
          <button onClick={copyToClipboard} className="bg-green-500 text-white p-2 rounded-lg">
            Copy Room ID
          </button>
          <button onClick={startGame} className="bg-red-500 text-white p-3 rounded-lg">
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateRoomPage;
