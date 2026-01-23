// frontend/game/components/PlayerSeat.jsx
import React from "react";

export default function PlayerSeat({ position, children }) {
    let style = {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    switch (position) {
        case "bottom":
            style.bottom = "2vh";
            style.left = "50%";
            style.transform = "translateX(-50%)";
            break;
        
        case "top":
            style.top = "2vh";
            style.left = "50%";
            style.transform = "translateX(-50%)";
            break;

        case "left":
            style.left = "2vw";
            style.top = "50%";
            style.transform = "translateY(-50%)";
            break;

        case "right":
            style.right = "2vw";
            style.top = "50%";
            style.transform = "translateY(-50%)";
            break;

        default:
            break;
    }
    return <div style = {style}> {children} </div>;
}