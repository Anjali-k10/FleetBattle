import React from "react";

const Ship = ({ ship, isVertical, placedShips, handleDragStart }) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={ship.image}
        alt={ship.name}
        className={`cursor-pointer ${placedShips.includes(ship.name) ? "opacity-50" : ""}`}
        draggable={!placedShips.includes(ship.name)}
        onDragStart={(event) => handleDragStart(event, ship)}
        style={{
          width: isVertical ? "25px" : `${ship.size * 25}px`,
          height: isVertical ? `${ship.size * 25}px` : "25px",
        }}
      />
      <span className="text-white">{ship.name} ({ship.size} grids)</span>
    </div>
  );
};

export default Ship;