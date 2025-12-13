import { users } from "./routes/api/users";

export type User = (typeof users)[number];
