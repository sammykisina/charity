import { fundraising_atoms, info_widget_atoms, modal_atoms } from "@/atoms";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  ModalHeader,
  Button,
  Error,
  Select,
  SpinnerLoader,
} from "@/components";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { organization_schemas } from "@/schemas";
import { trpc } from "src/utils/trpc";
import { DateRange } from "react-date-range";
import { addDays, format } from "date-fns";
import { Notifications } from "@/utils";
import { Fundraising } from "src/types/typings.t";

const CreateOrEditFundraising = () => {
  /**
   * Component States
   */
  type FundraisingSchema = z.infer<typeof fundraising_schema>;
  const { is_editing_fundraising_state, global_fundraising_state } =
    fundraising_atoms;
  const { show_create_or_edit_fundraising_modal_state } = modal_atoms;
  const { show_info_widget_state } = info_widget_atoms;
  const setShowInfoWidget = useSetRecoilState(show_info_widget_state);
  const [global_fundraising, setGLobalFundraising] = useRecoilState(
    global_fundraising_state
  );
  const [is_editing_fundraising, setIsEditingFundraising] = useRecoilState(
    is_editing_fundraising_state
  );
  const setShowCreateOrEditFundraisingModal = useSetRecoilState(
    show_create_or_edit_fundraising_modal_state
  );

  const [selected_campaign, setSelectedCampaign] = useState({
    name: "education",
    value: "education",
  });
  const { fundraising_schema } = organization_schemas;
  const [date_range, setDateRange] = useState<any[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  // let updated_data: Fundraising | null = null;

  const utils = trpc.useContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FundraisingSchema>({
    resolver: zodResolver(fundraising_schema),
  });

  const { mutateAsync, isLoading } = trpc.fundraising.create.useMutation({
    onSuccess: () => {
      setIsEditingFundraising(false);
      utils.fundraising.get.invalidate();
      Notifications.successNotification("Fundraising Created Successfully.");
      setShowCreateOrEditFundraisingModal(false);
    },
    onError: (error) => {
      setIsEditingFundraising(false);
      Notifications.errorNotification("Something Went Wrong.Please Try Later");
      console.log("error", error.message);
      setShowCreateOrEditFundraisingModal(false);
    },
  });

  const { mutateAsync: updateMutateAsync, isLoading: isUpdating } =
    trpc.fundraising.update.useMutation({
      onSuccess: () => {
        setIsEditingFundraising(false);
        utils.fundraising.get.invalidate();
        Notifications.successNotification("Fundraising Updated Successfully.");
        Notifications.successNotification("Fundraising Deleted Successfully.");
        setGLobalFundraising(null);
        setShowInfoWidget(false);
        setShowCreateOrEditFundraisingModal(false);
      },

      onError: (error) => {
        console.log(error);
      },
    });

  const options: { name: string; value: string }[] = [
    { name: "education", value: "education" },
    { name: "environment", value: "environment" },
    { name: "humanity", value: "humanity" },
    { name: "medical", value: "medical" },
    { name: "natural disaster", value: "natural disaster" },
  ];

  const update = (
    title: string,
    description: string,
    target_donation_amount: string
  ) => {
    // updated_data = {
    //   title,
    //   description,
    //   // target_donation_amount,
    //   start_date: new Date(format(date_range[0].startDate, "MM/dd/yyyy")),
    //   end_date: new Date(format(date_range[0].endDate, "MM/dd/yyyy")),
    //   campaign: selected_campaign.name,
    // };

    updateMutateAsync({
      id: global_fundraising?.id,
      fundraising_schema: {
        title,
        description,
        target_donation_amount,
        start_date: new Date(format(date_range[0].startDate, "MM/dd/yyyy")),
        end_date: new Date(format(date_range[0].endDate, "MM/dd/yyyy")),
        campaign: selected_campaign.name,
      },
    });
  };

  /**
   * Component Functions
   */
  const onSubmit: SubmitHandler<FundraisingSchema> = ({
    title,
    description,
    target_donation_amount,
  }) => {
    is_editing_fundraising
      ? update(title, description, target_donation_amount)
      : mutateAsync({
          title,
          description,
          target_donation_amount,
          start_date: new Date(format(date_range[0].startDate, "MM/dd/yyyy")),
          end_date: new Date(format(date_range[0].endDate, "MM/dd/yyyy")),
          campaign: selected_campaign.name,
        });
  };

  /**
   * Set Up Prev Values When Editing The Fundraising
   */
  useEffect(() => {
    if (global_fundraising && is_editing_fundraising) {
      reset({
        title: global_fundraising?.title,
        description: global_fundraising?.description,
        target_donation_amount:
          global_fundraising?.target_donation_amount.toString(),
      });
      setSelectedCampaign({
        name: global_fundraising.campaign || "",
        value: global_fundraising.campaign || "",
      });

      setDateRange([
        {
          startDate: global_fundraising.start_date,
          endDate: global_fundraising.end_date,
          key: "selection",
        },
      ]);
    }
  }, [is_editing_fundraising, global_fundraising, reset]);

  return (
    <section>
      {/* Header */}
      <section>
        <ModalHeader
          close={() => {
            setIsEditingFundraising(false);
            setShowCreateOrEditFundraisingModal(false);
            !is_editing_fundraising && setGLobalFundraising(null);
          }}
          is_editing={is_editing_fundraising}
          edit_title="Editing Fundraising."
          create_title="Creating A Fundraising."
        />
      </section>

      {/* Body */}
      <form className="space-y-1 px-4 py-2" onSubmit={handleSubmit(onSubmit)}>
        <section className="flex h-[14.5rem] flex-col gap-4 overflow-y-scroll py-3 scrollbar-hide sm:grid sm:h-[12rem] sm:grid-cols-2 sm:items-center sm:gap-x-4 sm:gap-y-4">
          <div className="relative">
            <input
              type="text"
              className="input peer"
              placeholder="Title"
              {...register("title", { required: true })}
            />
            <label className="input_label">Fundraising Title</label>

            {errors["title"] && (
              <Error error_message={errors["title"].message} />
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              {...register("description")}
              className="input peer"
              placeholder="Description"
            />
            <label className="input_label">Fundraising Description</label>

            {errors["description"] && (
              <Error error_message={errors["description"].message} />
            )}
          </div>

          <div>
            <Select
              multiple={false}
              options={options}
              select_wrapper_styles="bg-gray/30 rounded-[0.9rem] py-2 w-full"
              select_panel_styles="max-h-[10rem] bg-white border border-yellow shadow-md"
              selected={selected_campaign}
              setSelected={setSelectedCampaign}
            />
          </div>
          <div className="relative">
            <input
              type="number"
              className="input peer"
              placeholder="amount"
              {...register("target_donation_amount", { required: true })}
            />
            <label className="input_label">Fundraising Target Amount</label>

            {errors["target_donation_amount"] && (
              <Error error_message={errors["target_donation_amount"].message} />
            )}
          </div>

          <div className="col-span-2 flex flex-col items-center justify-center">
            <span className="text-dark/50">The Fundraising Last Day</span>

            <div className="relative inline-block">
              <DateRange
                onChange={(ranges) => setDateRange([ranges.selection])}
                ranges={date_range}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                months={1}
                direction="horizontal"
                minDate={new Date()}
                className="flex-1"
                rangeColors={["#FFD249"]}
              />
            </div>
          </div>
        </section>

        <div className="mb-1 flex justify-end">
          <Button
            title={
              isLoading || isUpdating ? (
                <SpinnerLoader color="fill-white" />
              ) : is_editing_fundraising ? (
                "Update"
              ) : (
                "Create"
              )
            }
            intent="primary_yellow"
            disabled={isLoading}
          />
        </div>
      </form>
    </section>
  );
};

export default CreateOrEditFundraising;
