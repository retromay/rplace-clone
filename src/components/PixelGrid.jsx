// src/components/PixelGrid.jsx
import React, { useState } from "react";

const PixelGrid = ({ gridSize = 50, selectedColor, onPixelClick }) => {
  const [grid, setGrid] = useState(
    Array(gridSize).fill(Array(gridSize).fill("#FFFFFF"))
  );

  const handlePixelClick = (x, y) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((color, colIndex) => {
        if (rowIndex === x && colIndex === y) return selectedColor;
        return color;
      })
    );
    setGrid(newGrid);

    // Pass the pixel change to the parent component or backend
    onPixelClick(x, y, selectedColor);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize}, 10px)`,
        gridTemplateRows: `repeat(${gridSize}, 10px)`,
      }}
    >
      {grid.map((row, x) =>
        row.map((color, y) => (
          <div
            key={`${x}-${y}`}
            onClick={() => handlePixelClick(x, y)}
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: color,
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          ></div>
        ))
      )}
    </div>
  );
};

export default PixelGrid;
