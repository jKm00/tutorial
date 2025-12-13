import { Request, Response, NextFunction } from "express";
import { Chat } from "../models/chat";

const chats = new Map<string, Chat>();

function getChat(req: Request, res: Response) {
  const { id } = req.params;
  const chat = chats.get(id);

  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  return res.json(chat);
}

function createChat(req: Request, res: Response) {
  const { name } = req.body;

  const id = crypto.randomUUID();
  const newChat: Chat = {
    id,
    members: [name],
    messages: [],
  };

  chats.set(id, newChat);

  return res.status(201).json({ data: { chatId: id } });
}

// async function connect(req: Request, res: any) {
//   console.log("WebSocket connection attempt");
//   const ws = await res.accept();
//   ws.on("message", (msg: any) => {
//     ws.send(`echo ${msg}`);
//   });
// }

export const chatController = {
  getChat,
  createChat,
  // connect,
};
