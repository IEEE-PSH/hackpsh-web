import { type AppRouter } from "@/server/root";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { headers } from "next/headers";
import { getURL, transformer } from "./shared";

export const serverTRPC = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    httpBatchLink({
      url: getURL(),
      headers() {
        const heads = new Map(headers());
        heads.set("x-trpc-source", "rsc");
        return Object.fromEntries(heads);
      },
    }),
  ],
});
