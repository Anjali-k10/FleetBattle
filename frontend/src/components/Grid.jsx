import React from "react";

const Grid = ({ grid = [], handleDrop, shipPositions, handleDragStart, SHIPS, timer }) => {
  return (
    <div className="relative border-4 border-white overflow-hidden" style={{ width: 500, height: 500 }}>
      <div className="grid" style={{
          width: 550,
          height: 550,
          gridTemplateColumns: `repeat(20, 25px)`,
          gridTemplateRows: `repeat(20, 25px)`,
          gap: "0px",
          border: "1px solid black",
        }}>
        {grid.length > 0 ? (
          grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const cellKey = `${rowIndex}-${colIndex}`;
              return (
                <div
                  key={cellKey}
                  className="border border-black relative bg-blue-500"
                  onDrop={(event) => timer > 0 && handleDrop(event, rowIndex, colIndex)}
                  onDragOver={(event) => event.preventDefault()}
                  style={{ width: "25px", height: "25px" }}
                />
              );
            })
          )
        ) : (
          <div className="text-white text-center">Loading Grid...</div>
        )}

        {shipPositions.map((ship, index) => {
          const shipData = SHIPS.find((s) => s.name === ship.name);
          return (
            <>
              {/* Render Faded Grid for Ship */}
              {[...Array(shipData.size)].map((_, i) => {
                const rowOffset = ship.isVertical ? i : 0;
                const colOffset = ship.isVertical ? 0 : i;
                return (
                  <div
                    key={`fade-${index}-${i}`}
                    className="absolute bg-gray-500 opacity-50"
                    style={{
                      width: "25px",
                      height: "25px",
                      top: `${(ship.row + rowOffset) * 25}px`,
                      left: `${(ship.col + colOffset) * 25}px`,
                    }}
                  />
                );
              })}
              {/* Render Ship */}
              <img
                key={index}
                src={shipData.image}
                alt={ship.name}
                className="absolute"
                draggable
                onDragStart={(event) => handleDragStart(event, ship, true)}
                style={{
                  width: ship.isVertical ? "25px" : `${shipData.size * 25}px`,
                  height: ship.isVertical ? `${shipData.size * 25}px` : "25px",
                  top: `${ship.row * 25}px`,
                  left: `${ship.col * 25}px`,
                }}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
