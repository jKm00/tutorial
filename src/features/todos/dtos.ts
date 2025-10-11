import { ServerResponse } from "~/types";
import { AddTodoErrorType } from "./errors";

export type AddTodoResponse = ServerResponse<string, AddTodoErrorType>;
