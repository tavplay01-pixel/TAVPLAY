import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../server/routers";
import { createContext } from "../../server/_core/context";

export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError: ({ path, error }) => {
    console.error(`Error in tRPC handler on path '${path}':`, error);
  },
});
