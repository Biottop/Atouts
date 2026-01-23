import React, { useState, useEffect } from "react";
import PlayerSeat from "./components/PlayerSeat";
import PlayerAvatar from "./components/PlayerAvatar";
import PlayerSelf from "./components/PlayerSelf";
import BiddingPanel from "./components/BiddingPanel";
import { useWebSocket } from "./hooks/useWebSocket";

export default function Table() {
  const { gameState, sendMessage } = useWebSocket("ws://localhost:3001");

  // État local pour savoir si on doit afficher le BiddingPanel
  const [showBidding, setShowBidding] = useState(true);

  // Réinitialiser le panel quand un nouveau tour d'enchères commence
  useEffect(() => {
    if (gameState && gameState.phase === "BID" && gameState.currentBidderIndex === 0) {
      const timer = setTimeout(() => setShowBidding(true), 0);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  // Jouer une carte
  const handlePlayCard = (card) => {
    sendMessage({ type: "playCard", card });
  };

  // Confirmer son enchère
  const handleBid = (bid) => {
    sendMessage({ type: "bid", value: bid });
    setShowBidding(false);
  };

  if (!gameState) return <div>Chargement du jeu...</div>;

  // Déterminer si le BiddingPanel doit être affiché
  const showBiddingPanel =
    gameState.phase === "BID" &&
    gameState.currentBidderIndex === 0 &&
    showBidding;

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#35654d" }}>
      {/* Joueur principal */}
      <PlayerSeat position="bottom">
        <PlayerSelf
          playerInfo={{ name: "THEO", score: gameState.players[0].score }}
          hand={gameState.players[0].hand}
          onCardClick={handlePlayCard}
        />
      </PlayerSeat>

      {/* Panel d'enchères */}
      {showBiddingPanel && (
        <BiddingPanel
          min={0}
          max={gameState.cardsPerPlayer}
          defaultBid={gameState.players[0].bid ?? 0}
          onBid={handleBid}
        />
      )}

      {/* Joueurs bots */}
      <PlayerSeat position="top">
        <PlayerAvatar
          name="BOT_HAUT"
          score={gameState.players[1].score}
          image="/assets/avatar_bot.png"
        />
      </PlayerSeat>

      <PlayerSeat position="left">
        <PlayerAvatar
          name="BOT_GAUCHE"
          score={gameState.players[2].score}
          image="/assets/avatar_bot.png"
        />
      </PlayerSeat>

      <PlayerSeat position="right">
        <PlayerAvatar
          name="BOT_DROITE"
          score={gameState.players[3].score}
          image="/assets/avatar_bot.png"
        />
      </PlayerSeat>
    </div>
  );
}
