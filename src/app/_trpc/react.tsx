"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";

import React, { useState } from "react";

import { type AppRouter } from "@/server/root";
import { httpBatchLink } from "@trpc/client";

export const trpc = createTRPCReact<AppRouter>();

export default function ReactQueryProvider({ children, headers }: { children: React.ReactNode, headers: Headers }) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `/api/trpc`,
          headers() {
            const heads = new Map(headers);
            heads.set("x-trpc-source", "react");
            return Object.fromEntries(heads);
          }
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}