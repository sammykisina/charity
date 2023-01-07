import { shared_schemas } from "@/schemas";
import { protectedProcedure, router } from "../trpc";
import { number, object, string } from "zod";

const { notification_schema } = shared_schemas;

export const notificationRoutes = router({
  create: protectedProcedure
    .input(notification_schema)
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx;
      const { title, message, owner, type, time } = input;

      return prisma.notification.create({
        data: {
          title,
          message,
          owner,
          type,
          time,
        },
      });
    }),

  get: protectedProcedure
    .input(
      object({
        cursor: string().nullish(),
        limit: number().min(1).max(100).default(10),
        owner: string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { limit, cursor, owner } = input;

      const notifications = await prisma.notification.findMany({
        take: limit + 1,
        orderBy: [{ time: "desc" }],
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          owner: {
            equals: owner,
          },
        },
      });

      let next_cursor: typeof cursor | undefined = undefined;

      if (notifications.length > limit) {
        const next_notification =
          notifications.pop() as typeof notifications[number];
        next_cursor = next_notification.id;
      }

      return {
        notifications,
        next_cursor,
      };
    }),
});
