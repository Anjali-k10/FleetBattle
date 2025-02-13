import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "./socket";

const CreateRoomPage = () => {
  const [roomId, setRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("roomCreated", (id) => {
      console.log("🔹 New Room Created:", id);
      setRoomId(id);
      setLoading(false);
    });

    socket.on("startGame", (id) => {
      if (id === roomId) {
        console.log("🎮 Game starting for Room ID:", id);
        navigate(`/game/${id}`);
      }
    });

    return () => {
      socket.off("roomCreated");
      socket.off("startGame");
    };
  }, [roomId, navigate]);

  const createRoom = () => {
    console.log("➡️ Requesting new room creation...");
    setLoading(true);
    setRoomId(null); // Reset room ID before making a request
    socket.emit("createRoom");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 p-4 space-y-6">
      <h1 className="text-4xl font-semibold text-blue-600">Create Room</h1>

      <button onClick={createRoom} disabled={loading} className="bg-blue-600 text-white p-4 rounded-lg">
        {loading ? "Creating Room..." : "Generate Room ID"}
      </button>

      {roomId && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Room ID: {roomId}</p>
          <p>Share this ID with a friend to join!</p>
        </div>
      )}
    </div>
  );
};

export default CreateRoomPage;
