export class CustomError extends Error {
  _type: string;

  constructor(type: string, message: string) {
    super(message);
    this._type = type;
  }

  get type() {
    return this._type;
  }
}

export function mapErrorToApiResponse<T>(error: CustomError): {
  ok: false;
  error: { message: string; type: T };
} {
  return {
    ok: false,
    error: { message: error.message, type: error.type as T },
  };
}
