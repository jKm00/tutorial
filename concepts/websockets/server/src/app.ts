import express from "express";
import config from "./config/config";
import { WebSocketExpress } from "websocket-express";
import router from "./routes";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { websocketController } from "./controllers/websocket.controller";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());

app.use(router);

wss.on("connection", websocketController.handleConnection);

server.listen(config.port, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
});
