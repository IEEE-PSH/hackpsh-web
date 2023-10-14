import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

/**
 * Outer context. Used in the routers and will e.g. bring `req` to the context as "not `undefined`".
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export async function createContext(opts: FetchCreateContextFnOptions) {

  return {
    req: opts.req,
  };
}
