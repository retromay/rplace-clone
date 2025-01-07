// src/components/ColorPalette.jsx
import React from "react";

const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFFFFF", "#000000"];

const ColorPalette = ({ selectedColor, setSelectedColor }) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      {colors.map((color) => (
        <div
          key={color}
          onClick={() => setSelectedColor(color)}
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: color,
            border: selectedColor === color ? "2px solid black" : "1px solid #ccc",
            cursor: "pointer",
          }}
        ></div>
      ))}
    </div>
  );
};  

export default ColorPalette;
