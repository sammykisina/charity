import React, { FC } from "react";
import { AnalysisData } from "src/types/typings.t";
import { Icon } from "@/components";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { generateNumberWithCommas } from "src/utils/app";

type OrgAnalysisCardProps = {
  analysis: AnalysisData;
  diff_styles?: string;
};

const OrgAnalysisCard: FC<OrgAnalysisCardProps> = ({
  analysis,
  diff_styles,
}) => {
  return (
    <section
      className={`rounded-[2rem] px-3 py-8 text-dark  ${
        analysis.title === "Total Donation" ? "bg-yellow" : "bg-white"
      }`}
    >
      {/* Title */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-dark/70">{analysis.title}</span>
        <Icon icon={<HiEllipsisHorizontal />} icon_wrapper_styles="icon" />
      </div>

      {/* Amount */}
      <div className="mt-5">
        <span className="text-[1.1rem] font-bold  text-dark/80 duration-300 ">
          Ksh {""}
          {generateNumberWithCommas(analysis.amount)}
        </span>
        <span className="ml-2 whitespace-nowrap text-xs font-semibold tracking-wider text-dark/50">
          {analysis.updated_status}
        </span>
      </div>

      {/* Diff */}
      <div className="mt-4 flex items-center gap-1">
        <span
          className={`text-base font-semibold ${
            diff_styles ? diff_styles : "text-dark"
          }`}
        >
          {analysis.difference}
        </span>

        <span className="text-sm font-semibold text-dark/80">
          {analysis.updated_status}
        </span>
      </div>
    </section>
  );
};

export default OrgAnalysisCard;
