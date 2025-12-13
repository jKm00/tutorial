import { WebSocket } from "ws";
import { IncomingMessage } from "http";

function handleConnection(ws: WebSocket, req: IncomingMessage) {
  console.log("New WebSocket connection");

  ws.on("message", (data) => {
    try {
      const message = JSON.parse(data.toString());
      console.log("Received message:", message);
      ws.send(JSON.stringify({ echo: message }));
    } catch (error) {
      ws.send(JSON.stringify({ error: "Invalid message format" }));
    }
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
}

export const websocketController = {
  handleConnection,
};
