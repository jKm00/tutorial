import { Router } from "websocket-express";
import chatRoutes from "./chat.routes";

const PREFIX = "/api";

const router = new Router();

router.use(`${PREFIX}/chats`, chatRoutes);

export default router;
