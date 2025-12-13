import { BaseError } from "./index.js";

export class NotFoundError extends BaseError {
  constructor(message: string = "Resource not found") {
    super("NOT_FOUND_ERROR", message);
  }
}