import { Router } from "websocket-express";
import { chatController } from "../controllers/chat.controller";

const router = new Router();

router.get("/:id", chatController.getChat);
router.post("", chatController.createChat);

// router.ws("/:id", chatController.connect);

export default router;
