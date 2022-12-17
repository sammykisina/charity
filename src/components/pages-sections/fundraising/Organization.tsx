import React, { useMemo } from "react";
import {
  Button,
  CampaignFilter,
  CampaignPill,
  DateCell,
  LongText,
  SpinnerLoader,
  Table,
} from "@/components";
import { fundraising_atoms, info_widget_atoms, modal_atoms } from "@/atoms";
import { useSetRecoilState } from "recoil";
import { trpc } from "src/utils/trpc";
// import { useQueryClient } from "@tanstack/react-query";
import { app_utils } from "@/utils";

const Organization = () => {
  /**
   * Component States
   */
  const { show_create_or_edit_fundraising_modal_state } = modal_atoms;
  const setShowCreateOrEditFundraisingModal = useSetRecoilState(
    show_create_or_edit_fundraising_modal_state
  );
  const LIMIT = 10;
  const { data, hasNextPage, fetchNextPage, isFetching } =
    trpc.fundraising.get.useInfiniteQuery(
      { limit: LIMIT },
      { getNextPageParam: (lastPage) => lastPage.next_cursor }
    );
  const fundraisings = data?.pages.flatMap((page) => page.fundraisings) ?? [];

  const { show_info_widget_state } = info_widget_atoms;
  const { global_fundraising_state } = fundraising_atoms;
  const setShowInfoWidget = useSetRecoilState(show_info_widget_state);
  const setGlobalFundraising = useSetRecoilState(global_fundraising_state);
  const { generateNumberWithCommas } = app_utils;

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
            Header: "Target Amount (Ksh)",
            accessor: "target_donation_amount",
          },
          {
            Header: "Donated Amount (Ksh)",
            accessor: "donated_amount",
          },
          {
            Header: "Starting Date",
            accessor: "start_date",
            Cell: DateCell,
          },
          {
            Header: "Ending Date",
            accessor: "end_date",
            Cell: DateCell,
          },
          {
            Header: "Action",
            accessor: "action",
          },
        ],
      },
    ],
    []
  );

  // const client = useQueryClient();

  // useEffect(() => {
  //   if (scroll_position > 90 && hasNextPage && !isFetching) {
  //     fetchNextPage();
  //   }
  // }, [scroll_position, hasNextPage, isFetching, fetchNextPage]);

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
          start_date: fundraising.start_date,
          end_date: fundraising.end_date,
          target_donation_amount: generateNumberWithCommas(
            fundraising.target_donation_amount
          ),
          donated_amount: generateNumberWithCommas(fundraising.donated_amount),
          campaign: fundraising.campaign,
          action: (
            <Button
              title="view"
              type="small"
              intent="primary_yellow"
              purpose={() => {
                setGlobalFundraising(fundraising);
                setShowInfoWidget(true);
              }}
            />
          ),
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
          purpose={() => setShowCreateOrEditFundraisingModal(true)}
          type="medium"
          intent="primary_yellow"
          full_width={false}
        />
      </div>

      {/* Fundraising Table */}
      <section className="relative h-[41.5rem] w-full rounded-t-[2rem] rounded-b-[1rem]  bg-white py-6 px-4 xs:h-[36rem]">
        <Table
          data={getFundraisings()}
          columns={columns}
          show_filters={true}
          table_height="h-[32rem] xs:h-[27.5rem] lg:h-[29.5rem]"
        />
        <div className=" absolute top-[24px]  right-[16px]">
          {hasNextPage && (
            <Button
              title={
                isFetching ? <SpinnerLoader color="fill-white" /> : "Load More"
              }
              intent="primary"
              purpose={() => {
                fetchNextPage();
              }}
            />
          )}
        </div>
      </section>
    </section>
  );
};

export default Organization;
