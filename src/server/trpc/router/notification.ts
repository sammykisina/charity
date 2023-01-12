import { shared_schemas } from "@/schemas";
import { protectedProcedure, router } from "../trpc";
import { array, number, object, string } from "zod";

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
      const user_id = ctx.session.user.id;
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
        include: {
          reads: {
            where: {
              user_id,
            },
            select: {
              user_id: true,
            },
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

  read: protectedProcedure
    .input(object({ notification_ids: array(string()) }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const user_id = ctx.session.user.id;
      const { notification_ids } = input;

      if (notification_ids.length > 0) {
         notification_ids.map((notification_id) => {
           prisma.readNotification.upsert({
             where: {
               notification_id_user_id: {
                 notification_id: notification_id,
                 user_id: user_id,
               },
             },
             create: {
               user_id: user_id,
               notification_id: notification_id,
             },
             update: {},
           });
         });
      }
     
    }),
});
