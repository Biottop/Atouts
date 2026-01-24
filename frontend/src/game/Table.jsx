// frontend/src/game/Table.jsx
import React from "react";
import PlayerSeat from "./components/PlayerSeat";
import PlayerAvatar from "./components/PlayerAvatar";
import PlayerSelf from "./components/PlayerSelf";
import BiddingPanel from "./components/BiddingPanel";
import Card from "./components/Card";
import { useWebSocket } from "./hooks/useWebSocket";

export default function Table() {
  const { gameState, sendMessage } = useWebSocket("ws://localhost:3001");

  if (!gameState) return <div>Chargement du jeu...</div>;

  /* =======================
     Actions joueur
     ======================= */

  const handleBid = (bid) => {
    sendMessage({ type: "bid", value: bid });
  };

  const handlePlayCard = (card) => {
    sendMessage({ type: "playCard", card });
  };

  /* =======================
     Helpers affichage
     ======================= */

  const isMyBidTurn =
    gameState.phase === "BID" &&
    gameState.currentBidderIndex === 0;

  const isMyPlayTurn =
    gameState.phase === "PLAY" &&
    gameState.currentPlayerIndex === 0;

  const getTrickCardTransform = (playerIndex) => {
    switch (playerIndex) {
      case 0: return "translateY(60px)";   // bas
      case 1: return "translateY(-60px)";  // haut
      case 2: return "translateX(-60px)";  // gauche
      case 3: return "translateX(60px)";   // droite
      default: return "";
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#35654d",
        position: "relative",
      }}
    >
      {/* =======================
          Joueur principal
         ======================= */}
      <PlayerSeat position="bottom">
        <PlayerSelf
          playerInfo={{
            name: "THEO",
            score: gameState.players[0].score,
          }}
          hand={gameState.players[0].hand}
          onCardClick={isMyPlayTurn ? handlePlayCard : null}
          isActive={gameState.currentPlayerIndex === 0}
        />
      </PlayerSeat>

      {/* =======================
          Panel d'enchères
         ======================= */}
      {isMyBidTurn && (
        <BiddingPanel
          min={0}
          max={gameState.cardsPerPlayer}
          defaultBid={gameState.players[0].bid ?? 0}
          onBid={handleBid}
        />
      )}

      {/* =======================
          Cartes du pli (centre)
         ======================= */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: "1rem",
          pointerEvents: "none",
        }}
      >
        {gameState.currentTrick.map((play, index) => (
          <div
            key={index}
            style={{ transform: getTrickCardTransform(play.playerIndex) }}
          >
            <Card card={play.card} />
          </div>
        ))}
      </div>

      {/* =======================
          Bots
         ======================= */}
      <PlayerSeat position="top">
        <PlayerAvatar
          name="BOT_HAUT"
          score={gameState.players[1].score}
          image="/assets/avatar_bot.png"
          isActive={gameState.currentPlayerIndex === 1}
        />
      </PlayerSeat>

      <PlayerSeat position="left">
        <PlayerAvatar
          name="BOT_GAUCHE"
          score={gameState.players[2].score}
          image="/assets/avatar_bot.png"
          isActive={gameState.currentPlayerIndex === 2}
        />
      </PlayerSeat>

      <PlayerSeat position="right">
        <PlayerAvatar
          name="BOT_DROITE"
          score={gameState.players[3].score}
          image="/assets/avatar_bot.png"
          isActive={gameState.currentPlayerIndex === 3}
        />
      </PlayerSeat>
    </div>
  );
}
