import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Timer from "./Timer";
import Grid from "./Grid";
import ShipSelection from "./ShipSelection";
import ship1 from "../assets/ship-1.png";
import ship2 from "../assets/ship-2.png";
import ship3 from "../assets/ship-3.png";
import ship4 from "../assets/ship-4.png";
import ship5 from "../assets/ship-5.png";

const SHIPS = [
  { name: "Destroyer", size: 2, image: ship1 },
  { name: "Submarine", size: 3, image: ship2 },
  { name: "Cruiser", size: 4, image: ship3 },
  { name: "Battleship", size: 5, image: ship4 },
  { name: "Carrier", size: 6, image: ship5 },
];

const createEmptyGrid = (size) => {
  return new Array(size).fill(null).map(() => new Array(size).fill(null));
};

const GamePage = () => {
  const [grid, setGrid] = useState(createEmptyGrid(20));
  const [shipPositions, setShipPositions] = useState([]);
  const [isVertical, setIsVertical] = useState(false);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();
  const { roomId } = useParams();

  // ✅ Fix: Redirect to home if roomId is missing
  useEffect(() => {
    if (!roomId) {
      localStorage.removeItem("gameStarted");
      localStorage.removeItem("roomId");
      navigate("/"); // Redirect to home if no room ID is found
    } else {
      localStorage.setItem("gameStarted", "true");
      localStorage.setItem("roomId", roomId);
    }

    return () => {
      localStorage.removeItem("gameStarted");
      localStorage.removeItem("roomId");
    };
  }, [roomId, navigate]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave the game?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // ✅ Fix: Prevent navigation away from the game page
  useEffect(() => {
    const handleBackNavigation = (event) => {
      event.preventDefault();
      navigate(`/game/${roomId}`, { replace: true });
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [navigate, roomId]);

  const handleDragStart = (event, ship) => {
    event.dataTransfer.setData("ship", JSON.stringify({ ...ship, isVertical }));
  };

  const handleDrop = (event, row, col) => {
    event.preventDefault();
    if (timer <= 0) return;

    const droppedShip = JSON.parse(event.dataTransfer.getData("ship"));
    const isVertical = droppedShip.isVertical;
    const shipSize = droppedShip.size;

    if (
      (isVertical && row + shipSize > 20) ||
      (!isVertical && col + shipSize > 20)
    ) {
      alert("Cannot place ship outside the grid!");
      return;
    }

    setShipPositions((prev) => prev.filter((s) => s.name !== droppedShip.name));

    setShipPositions((prev) => [
      ...prev,
      { name: droppedShip.name, row, col, isVertical },
    ]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl mb-4">Setup Phase</h1>
      <Timer timer={timer} setTimer={setTimer} isTimerActive={true} />
      <button
        onClick={() => setIsVertical(!isVertical)}
        className="mb-4 px-4 py-2 bg-blue-500 rounded"
      >
        Rotate ({isVertical ? "Vertical" : "Horizontal"})
      </button>
      <div className="flex gap-12">
        <Grid
          grid={grid}
          shipPositions={shipPositions}
          handleDrop={handleDrop}
          handleDragStart={handleDragStart}
          SHIPS={SHIPS}
          timer={timer}
        />
        <ShipSelection
          ships={SHIPS}
          isVertical={isVertical}
          placedShips={shipPositions.map((s) => s.name)}
          handleDragStart={handleDragStart}
        />
      </div>
    </div>
  );
};

export default GamePage;






