// frontend/game/components/PlayerAvatar.jsx
import React from "react";

export default function PlayerAvatar({ name, score, image }) {
    return (
        <div
            style = {{
                display: "flex",
                flexDirection: "colmun",
                alignItems: "center",
                gap: "0.25rem",
            }}
        >
            <img
                src = {image}
                alt = {name}
                style = {{
                    width: "8vw",
                    maxWidth: "64px",
                    minWidth: "40px",
                    aspectRatio: "1 / 1",
                    borderRadius: "50%",
                    objectFit: "cover",
                }}
            />
            <div style = {{ fontSize: "0.9rem", fontWeight: "600" }} >
                {name}
            </div>
            <div style = {{ fontSize: "0.75rem", opacity: 0.7}} >
                {score} pts
            </div>
        </div>
    );
}