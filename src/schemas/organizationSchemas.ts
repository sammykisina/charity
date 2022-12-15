import { date, object, string } from "zod";

const fundraising_schema = object({
  title: string({
    required_error: "Fundraising Title Is Required.",
  })
    .min(25, { message: "The Fundraising Title Is Too Short." })
    .max(100, { message: "The Fundraising Title Is Too Long." }),
  description: string({
    required_error: "Fundraising Description Is Required.",
  })
    .min(30, { message: "The Fundraising Description Is Too Short." })
    .max(150, { message: "The Fundraising Description Is Too Long." }),
  target_donation_amount: string({
    required_error: "Fundraising Target Amount Is Required.",
  }),
  start_date: date({
    required_error: "Fundraising Ending Date Is Required.",
  }).optional(),
  end_date: date({
    required_error: "Fundraising Ending Date Is Required.",
  }).optional(),
  campaign: string({
    required_error: "Fundraising Campaign Is Required.",
  }).optional(),
});

const organization_schemas = { fundraising_schema };

export default organization_schemas;
