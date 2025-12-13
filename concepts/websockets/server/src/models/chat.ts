import { Message } from "./message";

export type Chat = {
  id: string;
  members: string[];
  messages: Message[];
};
