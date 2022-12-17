import { protectedProcedure, publicProcedure, router } from "../trpc";
import { organization_schemas } from "@/schemas";
import { number, object, string } from "zod";

const { fundraising_schema } = organization_schemas;

export const fundraisingRoutes = router({
  create: protectedProcedure
    .input(fundraising_schema)
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx;
      const {
        title,
        description,
        target_donation_amount,
        campaign,
        start_date,
        end_date,
      } = input;

      return prisma.fundraising.create({
        data: {
          title,
          description,
          target_donation_amount: parseInt(target_donation_amount),
          campaign: campaign || "",
          start_date: start_date || "",
          end_date: end_date || "",
        },
      });
    }),

  get: publicProcedure
    .input(
      object({
        cursor: string().nullish(),
        limit: number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { limit, cursor } = input;

      const fundraisings = await prisma.fundraising.findMany({
        take: limit + 1,
        orderBy: [{ createdAt: "desc" }],
        cursor: cursor ? { id: cursor } : undefined,
      });

      let next_cursor: typeof cursor | undefined = undefined;

      if (fundraisings.length > limit) {
        const next_item = fundraisings.pop() as typeof fundraisings[number];
        next_cursor = next_item.id;
      }

      return {
        fundraisings,
        next_cursor,
      };
    }),

  getFeatured: publicProcedure
    .input(
      object({
        limit: number().min(4).max(6).default(4),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { limit } = input;

      const featured = await prisma.fundraising.findMany({
        take: limit,
        orderBy: [{ createdAt: "desc" }],
        where: {
          target_donation_amount: {
            gt: 500000,
          },
        },
      });

      return featured;
    }),

  update: protectedProcedure
    .input(
      object({
        id: string().optional(),
        fundraising_schema,
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx;
      const {
        id,
        fundraising_schema: {
          title,
          description,
          target_donation_amount,
          start_date,
          end_date,
          campaign,
        },
      } = input;

      return prisma.fundraising.update({
        data: {
          title,
          description,
          target_donation_amount: parseInt(target_donation_amount),
          campaign: campaign || "",
          start_date: start_date || "",
          end_date: end_date || "",
        },
        where: {
          id: id,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      object({
        id: string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;
      return prisma.fundraising.delete({
        where: {
          id: id,
        },
      });
    }),
});
