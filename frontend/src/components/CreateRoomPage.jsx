import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "./socket"; // Ensure socket is correctly imported

const CreateRoomPage = () => {
  const [roomId, setRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleRoomCreated = (id) => {
      console.log("🔹 Room Created:", id);
      setRoomId(id);
      setLoading(false);
    };

    socket.on("roomCreated", handleRoomCreated);

    return () => {
      socket.off("roomCreated", handleRoomCreated);
    };
  }, []);

  const createRoom = () => {
    console.log("➡️ Requesting room creation...");
    setLoading(true);
    setRoomId(null);
    socket.emit("createRoom");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 p-4 space-y-6">
      <h1 className="text-4xl font-semibold text-blue-600">Create Room</h1>

      <button onClick={createRoom} disabled={loading} className="bg-blue-600 text-white p-4 rounded-lg">
        {loading ? "Creating Room..." : "Generate Room ID"}
      </button>

      {roomId && (
        <div>
          <p className="text-lg font-semibold">Room ID: {roomId}</p>
          <p className="text-sm text-gray-600">Share this ID with another player.</p>
        </div>
      )}
    </div>
  );
};

export default CreateRoomPage;
