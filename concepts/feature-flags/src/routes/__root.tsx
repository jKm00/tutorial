import { HeadContent, Link, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ShoppingCart } from "lucide-react";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { user } from "@/auth";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  // const ENABLE_CHRISTMAS_THEME = true;
  // const ENABLE_CHRISTMAS_THEME = import.meta.env.VITE_ENABLE_CHRISTMAS_THEME === "true";
  const ENABLE_CHRISTMAS_THEME = new Date().getMonth() === 11;

  return (
    <html lang="en" data-theme={ENABLE_CHRISTMAS_THEME ? "christmas" : ""}>
      <head>
        <HeadContent />
      </head>
      <body>
        <header className="flex justify-between items-center p-4">
          <h1 className="font-bold uppercase">
            <Link to="/">My Company</Link>
          </h1>
          <ul className="flex items-center gap-2 text-sm">
            {user ? (
              <li>{user.email}</li>
            ) : (
              <>
                <li>Login</li>
                <li>Regiter</li>
              </>
            )}
            <li className="flex items-center">
              <ShoppingCart className="" /> (0)
            </li>
          </ul>
        </header>
        {children}
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
