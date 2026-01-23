// frontend/src/game/components/Card.jsx
import React from "react";

export default function Card({ card = null, hidden = false, onClick = null }) {
    let imageSrc = "/assets/cards/face_cachee.png";

    if (!hidden && card) {
        if (card.type === "ATOUT") {
            imageSrc = `/assets/cards/atout_${card.value}.png`;
        } else if (card.type === "EXCUSE") {
            imageSrc = `/assets/cards/excuse.png`;
        }
    }

    return (
        <img
            src={imageSrc}
            alt="carte"
            style={{
                width: "6vw",
                minWidth: "48px",
                maxWidth: "90px",
                aspectRatio: "2 / 3.5",
                cursor: onClick ? "pointer" : "default",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                borderRadius: "6px",
                margin: "0.25rem",
                userSelect: "none",
            }}
            onClick={onClick}
            draggable={false}
        />
    );
}
