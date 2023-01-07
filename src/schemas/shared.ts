import { object, string } from "zod";

const notification_schema = object({
  title: string(),
  message: string().min(15).max(60),
  owner: string(), // donor, organization,uid
  campaign: string().optional(),
});

const shared_schemas = {
  notification_schema,
};
export default shared_schemas;
