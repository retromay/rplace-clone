import React from "react";
import PixelCanvas from "./components/PixelCanvas";

const App = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Interactive Pixel Canvas</h1>
      <PixelCanvas gridSize={100} pixelSize={10} />
    </div>
  );
};

export default App;
