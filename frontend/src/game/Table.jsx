// frontend/src/game/components/Table.jsx
import React from "react";
import PlayerSeat from "./components/PlayerSeat";
import PlayerAvatar from "./components/PlayerAvatar";
import PlayerSelf from "./components/PlayerSelf";
import { sortHand, mockHand } from "./utils/SortHand";
import BiddingPanel from "./components/BiddingPanel";

export default function Table() {
    const handleBid = (bid) => {
        console.log("Joueur a choisi :", bid, " plis");
    };

    return (
        // Bidding Panel
        <div 
            style = {{ 
                position: "relative",
                width: "100vw",
                height: "100vh",
                backgroungColor: "#35654d"
            }} 
        >
            {/* Positions des joueurs */}
            <div
                style={{
                    position: "relative",
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "#35654d",
                }}
            >
                <PlayerSeat position="top">
                    <PlayerAvatar
                        name="BOT_HAUT"
                        score={500}
                        image="/assets/avatar_bot.png"
                    />
                </PlayerSeat>

                <PlayerSeat position="left">
                    <PlayerAvatar
                        name="BOT_GAUCHE"
                        score={0}
                        image="/assets/avatar_bot.png"
                    />
                </PlayerSeat>

                <PlayerSeat position="right">
                    <PlayerAvatar
                        name="BOT_DROITE"
                        score={0}
                        image="/assets/avatar_bot.png"
                    />
                </PlayerSeat>

                <PlayerSelf
                    playerInfo={{
                        name: "THEO",
                        score: 12,
                    }}
                    hand = {sortHand(mockHand)}
                    onCardClick = {(card) => console.log("Carte jouée :", card)}
                />
            </div>
            <BiddingPanel onBid = {handleBid} />
        </div>
    );
}
