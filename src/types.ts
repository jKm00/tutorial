export type ServerResponse<T, U> =
  | { ok: true; data: T }
  | { ok: false; error: { message: string; type: U } };
