import { z } from "zod";
import { tweetSchema } from "../../../components/CreateTweet";
import { router, protectedProcedure, publicProcedure } from "../trpc";

export const tweetRouter = router({
  create: protectedProcedure.input(tweetSchema).mutation(({ ctx, input }) => {
    const { prisma, session } = ctx;
    const { message } = input;
    const user_id = session.user.id;

    return prisma.tweet.create({
      data: {
        message,
        author: {
          connect: {
            id: user_id,
          },
        },
      },
    });
  }),

  get: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).default(10),
        where: z
          .object({
            author: z
              .object({
                name: z.string().optional(),
              })
              .optional(),
          })
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { cursor, limit, where } = input;
      const user_id = ctx.session?.user?.id;

      const tweets = await prisma.tweet.findMany({
        take: limit + 1,
        orderBy: [{ createdAt: "desc" }],
        cursor: cursor ? { id: cursor } : undefined,
        where,
        include: {
          author: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
          likes: {
            where: {
              user_id,
            },
            select: {
              user_id: true,
            },
          },
          _count: {
            select: {
              likes: true,
            },
          },
        },
      });

      let next_cursor: typeof cursor | undefined = undefined;

      if (tweets.length > limit) {
        const next_item = tweets.pop() as typeof tweets[number];
        next_cursor = next_item.id;
      }

      return {
        tweets,
        next_cursor,
      };
    }),

  like: protectedProcedure
    .input(z.object({ tweet_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user_id = ctx.session.user.id;
      const { prisma } = ctx;

      return prisma.like.create({
        data: {
          tweet: {
            connect: {
              id: input.tweet_id,
            },
          },
          user: {
            connect: {
              id: user_id,
            },
          },
        },
      });
    }),

  unlike: protectedProcedure
    .input(z.object({ tweet_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user_id = ctx.session.user.id;
      const { prisma } = ctx;

      return prisma.like.delete({
        where: {
          tweet_id_user_id: {
            tweet_id: input.tweet_id,
            user_id,
          },
        },
      });
    }),
});
