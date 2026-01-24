// frontend/src/game/components/PlayerAvatar.jsx
import React from "react";

export default function PlayerAvatar({ name, score, image, isActive = false }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.25rem",
      }}
    >
      {/* Cercle actif */}
      <div
        style={{
          padding: "4px",
          borderRadius: "50%",
          border: isActive ? "3px solid #ffd700" : "3px solid transparent",
          boxShadow: isActive ? "0 0 12px rgba(255, 215, 0, 0.8)" : "none",
          transition: "all 0.2s ease",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "8vw",
            maxWidth: "64px",
            minWidth: "40px",
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div style={{ fontSize: "0.9rem", fontWeight: "600" }}>{name}</div>
      <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>{score} pts</div>
    </div>
  );
}