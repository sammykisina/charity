import React from "react";
import clsx from "clsx";
import { type CampaignTitle } from "src/types/typings.t";

const CampaignPill = ({ value }: { value?: CampaignTitle }) => {
  return (
    <div
      className={clsx(
        "flex justify-center rounded-full px-2 py-[0.2rem] text-sm font-light capitalize tracking-wide text-white",
        value === "humanity" && "bg-yellow ",
        value === "education" && "bg-dark/50 ",
        value === "natural disaster" && "bg-gray/50  text-dark",
        value === "medical" && "bg-light",
        value === "environment" && "bg-green-400"
      )}
    >
      {value}
    </div>
  );
};

export default CampaignPill;
