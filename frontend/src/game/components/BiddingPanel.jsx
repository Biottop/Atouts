// frontend/src/game/components/BiddingPanel.jsx
import React, { useState } from "react";

export default function BiddingPanel({ min = 0, max = 13, defaultBid = 0, onBid }) {
    const [bid, setBid] = useState(defaultBid);

    const decrement = () => {
        setBid((prev) => Math.max(min, prev - 1));
    };

    const increment = () => {
        setBid((prev) => Math.min(max, prev + 1));
    };

    const confirmBid = () => {
        if (onBid) onBid(bid);
    };

    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(255,255,255,0.95)",
                padding: "1rem 2rem",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                zIndex: 1000,
            }}
        >
            <div style={{ fontWeight: 600 }}>Combien de plis pensez-vous réaliser ?</div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <button onClick={decrement} style={buttonStyle}>-</button>
                <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>{bid}</div>
                <button onClick={increment} style={buttonStyle}>+</button>
            </div>
            <button onClick={confirmBid} style={{ ...buttonStyle, width: "100%", marginTop: "0.5rem" }}>
                Confirmer
            </button>
        </div>
    );
}

const buttonStyle = {
    padding: "0.5rem 0.75rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
    fontWeight: 600,
};
