import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import socket from "./socket";

const WaitingRoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("startGame", (id) => {
      if (id === roomId) {
        navigate(`/game/${id}`);
      }
    });

    return () => {
      socket.off("startGame");
    };
  }, [roomId, navigate]);

  return (
    <div>
      <h1>Waiting for another player to join...</h1>
      <p>Room ID: {roomId}</p>
    </div>
  );
};

export default WaitingRoomPage;
