import React from "react";
import { Filter } from "@/components";

const CampaignFilter = ({ column }: { column: any }) => {
  return <Filter column={column} label="campaign" />;
};

export default CampaignFilter;
