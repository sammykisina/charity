import Image from "next/image";
import type { FC } from "react";
import type { Fundraising } from "src/types/typings.t";
import { app_utils } from "@/utils";
import { ProgressBar, Icon } from "@/components";

type OrgDashboardFundraisingCardProps = {
  fundraising: Fundraising;
};

const OrgDashboardFundraisingCard: FC<OrgDashboardFundraisingCardProps> = ({
  fundraising,
}) => {
  /**
   * Component States
   */
  const {
    calculatePercentage,
    generateNumberWithCommas,
    getFundraisingCampaignInfo,
  } = app_utils;
  const campaign = getFundraisingCampaignInfo(fundraising.campaign || "");
  const percentage = calculatePercentage(
    fundraising.target_donation_amount,
    fundraising.donated_amount
  );

  return (
    <section className="flex flex-col gap-1">
      <div className="grid grid-cols-3 items-center gap-2">
        {/* Image */}
        <div className="col-span-1 h-[6rem] w-full overflow-hidden rounded-[1rem]  lg:h-[4rem] ">
          <Image
            src={campaign?.image || ""}
            alt=""
            className="h-[6rem] w-full rounded-[1rem]  object-cover  lg:h-[4rem]"
          />
        </div>

        {/* Info */}
        <div className=" col-span-2">
          <p className="whitespace-nowrap text-sm font-bold capitalize text-dark/70 lg:w-[9rem] lg:overflow-hidden lg:text-ellipsis xl:w-[11rem]">
            {fundraising.title}
          </p>

          <div className="flex items-center">
            <Icon
              icon={campaign?.icon}
              icon_wrapper_styles="text-dark/80 text-[1.5rem]"
            />

            <span className="capitalize text-dark/80">{campaign?.title}</span>
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-4">
        <div className=" flex h-[0.3rem] items-center rounded-full bg-white">
          <ProgressBar done={percentage} />
        </div>

        <div className="flex items-center justify-between leading-3">
          <div>
            <span className="font-semibold text-dark/80">
              Ksh {""}
              {generateNumberWithCommas(fundraising.donated_amount)}
            </span>
            <span className="text-dark/50">
              /{generateNumberWithCommas(fundraising.target_donation_amount)}
            </span>
          </div>

          <span className="font-semibold text-dark/80">{percentage}%</span>
        </div>
      </div>
    </section>
  );
};

export default OrgDashboardFundraisingCard;
