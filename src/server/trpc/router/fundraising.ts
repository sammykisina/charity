import { protectedProcedure, router } from "../trpc";
import { organization_schemas } from "@/schemas";

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
          // start_date: start_date || "",
          start_date: start_date || "",
          end_date: end_date || "",
        },
      });
    }),
});
