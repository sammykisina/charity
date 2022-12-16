import { fundraising_atoms, info_widget_atoms } from "@/atoms";
import React, { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button, CampaignPill, InfoWidgetHeader } from "@/components";
import { app_utils } from "@/utils";
import Image from "next/image";
import { format } from "date-fns";
import { useClickOutside } from "@/hooks";

const FundraisingInfo = () => {
  /**
   * Component States
   */
  const { global_fundraising_state } = fundraising_atoms;
  const { show_info_widget_state } = info_widget_atoms;
  const [global_fundraising, setGlobalFundraising] = useRecoilState(
    global_fundraising_state
  );
  const setShowInfoWidget = useSetRecoilState(show_info_widget_state);
  const {
    getFundraisingCampaignInfo,
    generateNumberWithCommas,
    calculatePercentage,
  } = app_utils;
  const fundraising_info_ref = useRef<HTMLElement>(null);

  /**
   * Component Functions
   */
  const campaign_info = getFundraisingCampaignInfo(
    global_fundraising?.campaign || ""
  );
  const percentage = calculatePercentage(
    global_fundraising?.target_donation_amount || 0,
    global_fundraising?.donated_amount || 0
  );
  useClickOutside(fundraising_info_ref, () => setShowInfoWidget(false));

  return (
    <section ref={fundraising_info_ref}>
      {/* Header */}
      <section>
        <InfoWidgetHeader
          close={() => {
            setGlobalFundraising(null);
            setShowInfoWidget(false);
          }}
          title={global_fundraising?.title || ""}
        />
      </section>

      {/* Body */}
      <section className="mx-4 mt-2 flex flex-col  gap-2 xs:gap-4">
        {/* Image */}
        <div className="relative">
          <div className="h-[15rem] w-full overflow-hidden ">
            <Image
              src={campaign_info?.image || ""}
              alt=""
              className="h-[15rem] w-full  rounded-[1.8rem]  object-cover"
            />
          </div>

          <span className="absolute top-[24px]  right-[16px]">
            <CampaignPill value={campaign_info?.title} />
          </span>
        </div>

        {/* General Info */}
        <div className="px-2">
          {/* Description */}
          <p className=" font-semibold text-dark/50 first-letter:uppercase">
            {global_fundraising?.description}
          </p>

          {/* Dates */}
          <div className="mt-2 flex flex-row items-center justify-start gap-3">
            <span className="h-fit w-fit whitespace-nowrap rounded-full bg-gray px-2 py-1 text-xs font-bold">
              {global_fundraising?.start_date &&
                format(global_fundraising?.start_date, "EE, MMM d, yyy")}
            </span>

            <span className="text-gray-900 font-bold uppercase">-</span>

            <span className="h-fit w-fit whitespace-nowrap rounded-full bg-gray px-2 py-1 text-xs  font-bold">
              {global_fundraising?.end_date &&
                format(global_fundraising?.end_date, "EE, MMM d, yyy")}
            </span>
          </div>

          {/* Donations */}
          <div className="mt-6 flex justify-between gap-4 rounded-[2rem]  bg-dark px-4 py-6 text-white">
            <div className=" flex flex-col gap-4 ">
              <div className="flex flex-col">
                <span className=" whitespace-nowrap font-extralight tracking-wide">
                  Target Amount (Ksh)
                </span>

                <span className="text-[1.5rem] font-extrabold tracking-widest">
                  {generateNumberWithCommas(
                    global_fundraising?.target_donation_amount || 0
                  )}
                </span>
              </div>

              <div className="flex flex-col">
                <span className=" whitespace-nowrap font-extralight tracking-wide">
                  Donated Amount (Ksh)
                </span>

                <span className="text-[1.5rem] font-extrabold tracking-widest">
                  {generateNumberWithCommas(
                    global_fundraising?.donated_amount || 0
                  )}
                </span>
              </div>
            </div>

            <div
              className={`flex items-center justify-center rounded-md border border-gray ${
                percentage > 500
                  ? "w-1/2 text-[1.5rem] xs:text-[3rem]"
                  : "w-2/5 text-[2rem] xs:text-[4rem]"
              }`}
            >
              {percentage > 500
                ? percentage.toString().substring(0, 3) + "% +"
                : percentage + "%"}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end gap-2 xs:mt-0">
          <Button
            title="Edit"
            type="medium"
            intent="primary_yellow"
            full_width={true}
          />

          <Button
            title="Delete"
            type="medium"
            intent="danger"
            full_width={false}
          />
        </div>
      </section>
    </section>
  );
};

export default FundraisingInfo;
