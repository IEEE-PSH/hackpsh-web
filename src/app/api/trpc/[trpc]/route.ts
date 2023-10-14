import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/api-server";

function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req: req,
    createContext: () => ({req}),
  })
}


export { handler as GET, handler as POST };