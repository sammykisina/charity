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
import { modal_atoms } from "@/atoms";
import { useSetRecoilState } from "recoil";
import { trpc } from "src/utils/trpc";
import { useQueryClient } from "@tanstack/react-query";

const Organization = () => {
  /**
   * Component States
   */
  const { show_create_or_edit_fundraising_modal_state } = modal_atoms;
  const setShowCreateOrEditFundraisingModal = useSetRecoilState(
    show_create_or_edit_fundraising_modal_state
  );
  const LIMIT = 3;
  const { data, hasNextPage, fetchNextPage, isFetching } =
    trpc.fundraising.get.useInfiniteQuery(
      { limit: LIMIT },
      { getNextPageParam: (lastPage) => lastPage.next_cursor }
    );
  const fundraisings = data?.pages.flatMap((page) => page.fundraisings) ?? [];

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

  const client = useQueryClient();

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
          table_height="h-[32rem] xs:h-[29.5rem] sm:h-[29rem] md:h-[29.5rem]"
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
