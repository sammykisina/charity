import React, { useMemo } from "react";
import {
  Button,
  CampaignFilter,
  CampaignPill,
  DateCell,
  LongText,
  Table,
} from "@/components";
import { fundraisings } from "@/constants";

const Organization = () => {
  /**
   * Component States
   */
  {
    /*title, description, end_date, target_donation_amount, donated_amount, campaign */
  }
  const columns = useMemo(
    () => [
      {
        Header: "All Your Fundraising",
        columns: [
          {
            Header: "Title",
            accessor: "title",
          },
          {
            Header: "Description",
            accessor: "description",
            Cell: LongText,
          },
          {
            Header: "Campaign",
            accessor: "campaign",
            Cell: CampaignPill,
            Filter: CampaignFilter,
          },
          {
            Header: "Donation Amount",
            accessor: "target_donation_amount",
          },
          {
            Header: "Donated Amount",
            accessor: "donated_amount",
          },
          {
            Header: "Ending Date",
            accessor: "end_date",
            Cell: DateCell,
          },
        ],
      },
    ],
    []
  );

  /**
   * Component Functions
   */
  const getFundraisings = () => {
    let all_fundraisings_data = [] as any[];

    fundraisings.map((fundraising) => {
      all_fundraisings_data = [
        ...all_fundraisings_data,
        {
          title: fundraising.title,
          description: fundraising.description,
          end_date: fundraising.end_date,
          target_donation_amount: fundraising.target_donation_amount,
          donated_amount: fundraising.donated_amount,
          campaign: fundraising.campaign,
        },
      ];
    });

    return all_fundraisings_data;
  };

  return (
    <section className="flex flex-col gap-6 px-4">
      {/* Create New Donation Button */}
      <div className="flex  justify-end">
        <Button
          title="CREATE A FUNDRAISING"
          purpose={() => ""}
          type="medium"
          intent="primary_yellow"
          full_width={false}
        />
      </div>

      {/* Fundraising Table */}
      <section className=" h-[41.5rem] w-full rounded-t-[2rem] rounded-b-[1rem]  bg-white py-6 px-4 xs:h-[36rem]">
        <Table
          data={getFundraisings()}
          columns={columns}
          show_filters={true}
          table_height="h-[32rem] xs:h-[29.5rem] sm:h-[29rem] md:h-[29.5rem]"
        />
      </section>
    </section>
  );
};

export default Organization;
