export class BaseError extends Error {
  private type: string;

  constructor(
    type: string = "UNKNOW_ERROR",
    message: string = "An error occurred",
  ) {
    super(message);
    this.type = type;
  }

  toJSON() {
    return {
      type: this.type,
      message: this.message,
    };
  }
}