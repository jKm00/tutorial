import { InferSelectModel } from "drizzle-orm";
import { todo } from "./schema";

export type Todo = InferSelectModel<typeof todo>;
