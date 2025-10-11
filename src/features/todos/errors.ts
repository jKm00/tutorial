import { CustomError } from "~/errors";

export type AddTodoErrorType =
  | "TooShortError"
  | "DuplicateError"
  | "UnknownError";

export class DuplicateTodoError extends CustomError {
  constructor(message: string) {
    super("DuplicateError", message);
  }
}
