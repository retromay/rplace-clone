// src/App.jsx
import React, { useState } from "react";
import PixelGrid from "./components/PixelGrid";
import ColorPalette from "./components/ColorPalatte";

function App() {
  const [selectedColor, setSelectedColor] = useState("#FF0000");

  const handlePixelClick = (x, y, color) => {
    console.log(`Pixel placed at (${x}, ${y}) with color ${color}`);
    // Optionally, send this data to a backend via WebSocket or API
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>r/Place Clone</h1>
      <ColorPalette selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      <PixelGrid gridSize={50} selectedColor={selectedColor} onPixelClick={handlePixelClick} />
    </div>
  );
}

export default App;
