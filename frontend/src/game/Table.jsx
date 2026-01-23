import React from "react";
import PlayerSeat from "./components/PlayerSeat";
import PlayerAvatar from "./components/PlayerAvatar";
import PlayerSelf from "./components/PlayerSelf";
import BiddingPanel from "./components/BiddingPanel";
import { useWebSocket } from "./hooks/useWebSocket";

export default function Table() {
  const { gameState, sendMessage } = useWebSocket("ws://localhost:3001");

  if (!gameState) return <div>Chargement du jeu...</div>;

  const handleBid = (bid) => {
    sendMessage({ type: "bid", value: bid });
  };

  const handlePlayCard = (card) => {
    sendMessage({ type: "playCard", card });
  };

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#35654d" }}>
      <PlayerSeat position="bottom">
        <PlayerSelf
          playerInfo={{
            name: "THEO",
            score: gameState.players[0].score,
          }}
          hand={gameState.players[0].hand}
          onCardClick={handlePlayCard}
        />
      </PlayerSeat>

      <BiddingPanel onBid={handleBid} />

      {/* autres joueurs */}
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
