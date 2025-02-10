import React from "react";
import Ship from "./Ship";

const ShipSelection = ({ ships, isVertical, placedShips, handleDragStart }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg">Your Ships</h3>
      {ships.map((ship, index) => (
        <Ship key={index} ship={ship} isVertical={isVertical} placedShips={placedShips} handleDragStart={handleDragStart} />
      ))}
    </div>
  );
};

export default ShipSelection;