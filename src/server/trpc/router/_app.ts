import { router } from "../trpc";
import { authRouter } from "./auth";
import { fundraisingRoutes } from "./fundraising";

export const appRouter = router({
  auth: authRouter,
  fundraising: fundraisingRoutes,
});

// export type definition of API
export type AppRouter = typeof appRouter;
