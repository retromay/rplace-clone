import React, { useRef, useState, useEffect } from "react";

const PixelCanvas = ({ gridSize = 100, pixelSize = 10, defaultColor = "#FFFFFF" }) => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1); // For zooming
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // For panning
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedColor, setSelectedColor] = useState("#FF0000");

  const grid = useRef(
    Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(defaultColor)) // Create grid with default color
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply transformations for zoom and pan
      ctx.save();
      ctx.scale(scale, scale);
      ctx.translate(offset.x, offset.y);

      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          // Draw each pixel
          ctx.fillStyle = grid.current[x][y];
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
          ctx.strokeStyle = "#CCCCCC"; // Grid lines
          ctx.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
      ctx.restore();
    };

    drawGrid();
  }, [scale, offset, gridSize, pixelSize]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // Calculate mouse position relative to the canvas
    const mouseX = (e.clientX - rect.left) / scale - offset.x;
    const mouseY = (e.clientY - rect.top) / scale - offset.y;

    const x = Math.floor(mouseX / pixelSize);
    const y = Math.floor(mouseY / pixelSize);

    // Ensure the click is within the grid
    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
      grid.current[x][y] = selectedColor; // Update grid color
      const ctx = canvas.getContext("2d");

      // Redraw just the clicked pixel
      ctx.save();
      ctx.scale(scale, scale);
      ctx.translate(offset.x, offset.y);
      ctx.fillStyle = selectedColor;
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      ctx.strokeStyle = "#CCCCCC"; // Grid border
      ctx.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      ctx.restore();
    }
  };

  const handleWheel = (e) => {
    // Zoom in/out on mouse wheel
    const zoomFactor = 1.1;
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev * zoomFactor, 5)); // Limit max zoom
    } else {
      setScale((prev) => Math.max(prev / zoomFactor, 0.5)); // Limit min zoom
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = (e.clientX - dragStart.x) / scale;
      const dy = (e.clientY - dragStart.y) / scale;
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <label>Select Color:</label>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={gridSize * pixelSize}
        height={gridSize * pixelSize}
        style={{
          border: "1px solid black",
          cursor: isDragging ? "grabbing" : "pointer",
        }}
        onClick={handleCanvasClick}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves canvas
      />
    </div>
  );
};

export default PixelCanvas;
