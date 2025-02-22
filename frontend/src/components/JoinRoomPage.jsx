import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Socket from "../utils/Socket";

const JoinRoomPage = () => {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Socket.on("startGame", (id) => {
      if (id === roomId) {
        navigate(`/game/${id}`);
      }
    });

    return () => {
      Socket.off("startGame");
    };
  }, [roomId, navigate]);

  const handleJoinRoom = () => {
    if (!roomId.trim()) {
      setError("Enter a valid Room ID.");
      return;
    }
    setError("");
    Socket.emit("joinRoom", roomId);
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Join Room</h1>
      <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      {error && <p>{error}</p>}
      <button onClick={handleJoinRoom}>Join Game</button>
    </div>
  );
};

export default JoinRoomPage;
