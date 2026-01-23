// frontend/src/game/hooks/useWebSocket.js
import { useEffect, useRef, useState } from "react";

export function useWebSocket(url) {
  const ws = useRef(null);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("WebSocket connecté à", url);
    };

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "gameState") {
        setGameState(msg.data);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket déconnecté");
    };

    return () => {
      ws.current.close();
    };
  }, [url]);

  const sendMessage = (msg) => {
    if (ws.current && ws.current.readyState === 1) {
      ws.current.send(JSON.stringify(msg));
    }
  };

  return { gameState, sendMessage };
}
