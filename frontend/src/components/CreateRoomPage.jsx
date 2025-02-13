import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Socket from "../utils/Socket";

const CreateRoomPage = () => {
  const [roomId, setRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Socket.on("roomCreated", (id) => {
      console.log("✅ Room Created:", id);
      setRoomId(id);
      setLoading(false);
    });

    return () => {
      Socket.off("roomCreated");
    };
  }, []);

  const createRoom = () => {
    console.log("➡️ Requesting room creation...");
    setLoading(true);
    setRoomId(null);
    Socket.emit("createRoom");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId);
    alert("📋 Room ID copied to clipboard!");
  };

  const startGame = () => {
    if (roomId) {
      navigate(`/waiting-room/${roomId}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Create a Room</h1>

        {!roomId ? (
          <button
            onClick={createRoom}
            disabled={loading}
            className={`w-full py-3 text-lg font-semibold rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Creating Room..." : "Generate Room ID"}
          </button>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg font-semibold bg-gray-200 px-4 py-2 rounded-lg">{roomId}</p>

            <button
              onClick={copyToClipboard}
              className="w-full py-2 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
            >
              Copy Room ID
            </button>

            <button
              onClick={startGame}
              className="w-full py-2 text-lg font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              Start Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRoomPage;
