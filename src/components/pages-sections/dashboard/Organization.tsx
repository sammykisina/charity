import React, { useState } from "react";
import {
  Button,
  Icon,
  Line,
  NavLink,
  OrgAnalysisCard,
  OrgDashboardFundraisingCard,
  Select,
} from "@/components";
import { type SelectionOption } from "src/types/typings.t";
import {
  filter_donation_analytic_options,
  filter_period_options,
  fundraisings,
} from "@/constants";
import { HiArrowUpRight } from "react-icons/hi2";

const Organization = () => {
  /**
   * Component States
   */
  const [selected_period, setSelectedPeriod] = useState<SelectionOption>(
    filter_period_options[0] || { name: "", value: "" }
  );

  const [
    selected_filter_donation_analytic_option,
    setSelectedFilterDonationAnalyticOption,
  ] = useState<SelectionOption>(
    filter_donation_analytic_options[0] || { name: "", value: "" }
  );

  return (
    <section className="px-4">
      {/* Period Select */}
      <Select
        multiple={false}
        options={filter_period_options}
        select_wrapper_styles="bg-white rounded-[0.9rem] py-4 w-[10rem]"
        select_panel_styles="max-h-[10rem] bg-white border border-dark shadow-md"
        selected={selected_period}
        setSelected={setSelectedPeriod}
      />

      <section className="mt-2 h-[37rem] gap-4 space-y-4  overflow-y-scroll  pt-2 scrollbar-hide">
        {/* Top Analysis */}
        <section className="grid grid-cols-1 gap-2 xs:grid-cols-2 sm:flex sm:flex-col sm:gap-4 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3">
          <OrgAnalysisCard
            analysis={{
              title: "Total Donation",
              amount: 821250,
              updated_status: "Updated 1d ago",
              difference: "+3.21",
              filter: `Than` + selected_period,
            }}
          />
          <OrgAnalysisCard
            analysis={{
              title: "Donation Today",
              amount: 33260,
              updated_status: "Updated 30m ago",
              difference: "+2.32%",
              filter: `Than yesterday`,
            }}
            diff_styles="text-[#46ABDF]"
          />
          <div className="justify-center xs:col-span-2 xs:flex lg:col-span-1">
            <div className="xs:w-3/4 sm:w-full md:w-3/4 lg:w-full xl:w-full">
              <OrgAnalysisCard
                analysis={{
                  title: "Total Donor",
                  amount: 10243,
                  updated_status: "Updated 1d ago",
                  difference: "-1.82",
                  filter: `Than` + selected_period,
                }}
                diff_styles="text-red-500"
              />
            </div>
          </div>
        </section>

        {/* Graph And Fundraising */}
        <section className="flex flex-col gap-3 lg:grid lg:grid-cols-3">
          {/* Graph */}
          <section className="flex h-[28rem] flex-col gap-1 rounded-[2rem] bg-white p-2 lg:col-span-2 lg:h-[24rem]">
            <div className="flex items-center justify-between px-1 xs:px-6">
              <span className="text-xs font-bold text-dark/80 xs:text-[1rem] sm:text-xs md:text-xs lg:text-[1rem]">
                Donation Analytics
              </span>

              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-2">
                  {/* Label One */}
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-[#46ABDF]" />
                    <span className="text-sm font-bold text-dark/70 xs:text-[1rem]   sm:text-xs md:text-xs lg:text-[1rem]">
                      Humanity
                    </span>
                  </div>

                  {/* Label Two */}
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-yellow" />
                    <span className="text-sm font-bold text-dark/70 xs:text-[1rem] sm:text-xs md:text-xs lg:text-[1rem]">
                      Study
                    </span>
                  </div>
                </div>

                {/* Selection Dropdown */}
                <div>
                  <Select
                    multiple={false}
                    options={filter_donation_analytic_options}
                    select_wrapper_styles="bg-gray/30 rounded-[0.9rem] w-[7rem] p-2 "
                    select_panel_styles="max-h-[10rem] bg-white border border-dark shadow-md"
                    selected={selected_filter_donation_analytic_option}
                    setSelected={setSelectedFilterDonationAnalyticOption}
                  />
                </div>
              </div>
            </div>

            <Line />
          </section>

          {/* Fundraising */}
          <section className="h-[28rem] rounded-[2rem] bg-white py-3 px-5 lg:h-[24rem] lg:px-2">
            <div className="flex items-center justify-between px-4">
              {/* Title */}
              <span className="text-lg font-bold tracking-wider text-dark/80 lg:text-[1rem]">
                Your Fundraising
              </span>

              <Icon
                icon={<HiArrowUpRight />}
                icon_wrapper_styles="text-[1.5rem] text-dark/50"
              />
            </div>

            {/* List Of Fundraising With Most Donated Amount */}
            <section className="flex flex-col gap-8">
              {fundraisings
                .slice(0, 2)
                .map((single_fundraising, single_fundraising_index) => (
                  <OrgDashboardFundraisingCard
                    key={single_fundraising_index}
                    fundraising={single_fundraising}
                  />
                ))}
            </section>

            {/* View More Button */}
            <div className="mt-6 flex justify-center">
              <NavLink
                type="medium"
                route={{ to: "/fundraising", name: "View More" }}
                active
              />
            </div>
          </section>
        </section>

        {/* Donation table */}
        <section className="h-[25rem] w-full rounded-[2rem] bg-white"></section>
      </section>
    </section>
  );
};

export default Organization;
