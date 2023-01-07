import { router } from "../trpc";
import { authRouter } from "./auth";
import { fundraisingRoutes } from "./fundraising";
import { notificationRoutes } from "./notification";

export const appRouter = router({
  auth: authRouter,
  fundraising: fundraisingRoutes,
  notification: notificationRoutes,
});

// export type definition of API
export type AppRouter = typeof appRouter;
