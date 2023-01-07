import { shared_schemas } from "@/schemas";
import { protectedProcedure, router } from "../trpc";

const { notification_schema } = shared_schemas;

export const notificationRoutes = router({
  create: protectedProcedure
    .input(notification_schema)
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx;
      const { title, campaign, message, owner } = input;

      return prisma.notification.create({
        data: {
          title,
          message,
          owner,
        },
      });
    }),
});
