import Image from "next/image";
import type { FC } from "react";
import type { Fundraising as FundraisingType } from "src/types/typings.t";
import { app_utils } from "@/utils";
import { ProgressBar } from "@/components";

interface FundraisingProps {
  fundraising: FundraisingType;
}

const Fundraising: FC<FundraisingProps> = ({
  fundraising: {
    title,
    description,
    target_donation_amount,
    donated_amount,
    campaign,
  },
}) => {
  /**
   * Component states
   */
  const {
    calculatePercentage,
    generateNumberWithCommas,
    getFundraisingCampaignInfo,
  } = app_utils;
  
  const description_length = description.length;
  const percentage = calculatePercentage(
    target_donation_amount,
    donated_amount
  );

  return (
    <section className="h-[25rem] rounded-[1rem] bg-gray/40 p-2">
      <div className="h-[10rem] w-[15rem] overflow-hidden ">
        <Image
          src={getFundraisingCampaignInfo(campaign || "")?.image || ""}
          alt=""
          className="h-[10rem] w-[15rem]  rounded-[1.8rem]  object-cover"
        />
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {/* Title */}
        <h2 className="whitespace-nowrap text-base font-semibold capitalize text-dark/70">
          {title}
        </h2>

        {/* Description */}
        {description_length > description.substring(0, 150).length ? (
          <p className="text-dark/40">{description.substring(0, 100)}...</p>
        ) : (
          <p className="text-dark/40">{description}</p>
        )}
      </div>

      {/* The Progress Bar and Percentage Donated */}
      <div className="mt-[1rem] flex flex-col gap-4">
        <div className=" flex h-[0.3rem] items-center rounded-full bg-white">
          <ProgressBar done={percentage} />
        </div>

        <div className="flex items-center justify-between leading-3">
          <div>
            <span className="font-semibold text-dark/80">
              Ksh {""}
              {generateNumberWithCommas(donated_amount)}
            </span>
            <span className="text-dark/50">
              /{generateNumberWithCommas(target_donation_amount)}
            </span>
          </div>

          <span className="font-semibold text-dark/80">{percentage}%</span>
        </div>
      </div>
    </section>
  );
};

export default Fundraising;
