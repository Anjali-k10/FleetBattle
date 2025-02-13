import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

const CreateRoomPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("roomCreated", (roomId) => {
      console.log("✅ Room Created:", roomId);
      setLoading(false);
      navigate(`/waiting-room/${roomId}`); // Redirect to waiting room
    });

    return () => {
      socket.off("roomCreated");
    };
  }, [navigate]);

  const createRoom = () => {
    console.log("➡️ Requesting room creation...");
    setLoading(true);
    socket.emit("createRoom");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 p-4 space-y-6">
      <h1 className="text-4xl font-semibold text-blue-600">Create Room</h1>
      <button onClick={createRoom} disabled={loading} className="bg-blue-600 text-white p-4 rounded-lg">
        {loading ? "Creating Room..." : "Generate Room ID"}
      </button>
    </div>
  );
};

export default CreateRoomPage;


