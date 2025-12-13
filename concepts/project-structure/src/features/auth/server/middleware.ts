import { createMiddleware } from "@tanstack/react-start";

export const withAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
  return next();
});
