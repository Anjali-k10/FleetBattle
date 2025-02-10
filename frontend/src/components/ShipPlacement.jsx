import React from 'react';

const ShipPlacement = ({ onShipPlaced }) => {
  const handlePlacement = () => {
    // Logic for placing ships
    onShipPlaced();
  };

  return (
    <div>
      <h3>Place Your Ships</h3>
      <button onClick={handlePlacement}>Place Ships</button>
    </div>
  );
};

export default ShipPlacement;
