// frontend/src/game/components/PlayerSelf.jsx
import React from "react";
import Card from "./Card";
import PlayerAvatar from "./PlayerAvatar";

export default function PlayerSelf({ hand = [], playerInfo = {}, onCardClick = null }) {
    return (
        <div
            style = {{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                bottom: "2vh",
                left: "50%",
                transform: "translateX(-50%)",
                gap: "1rem",
            }}
        >
            {/* Avatar et score */}
            <PlayerAvatar
                name = {playerInfo.name || "MOI"}
                score = {playerInfo.score || 0}
                image = {playerInfo.image || "/assets/avatar_player.png"}
            />
            {/* Cartes du joueur */}
            <div style = {{ display: "flex", gap: "0.5rem" }} >
                {hand.map((card, index) => (
                    <Card
                        key = {index}
                        card = {card}
                        hidden = {false}
                        onClick = {() => onCardClick && onCardClick(card)}
                    />
                ))}
            </div>
        </div>
    );
}