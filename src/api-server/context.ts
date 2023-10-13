import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

/**
 * Outer context. Used in the routers and will e.g. bring `req` & `res` to the context as "not `undefined`".
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export async function createContext(opts: CreateNextContextOptions) {

  return {
    req: opts.req,
    res: opts.res,
  };
}
