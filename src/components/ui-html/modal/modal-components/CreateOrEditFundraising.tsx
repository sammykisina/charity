import { fundraising_atoms, modal_atoms } from "@/atoms";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ModalHeader, Button, Error, Select } from "@/components";
import { useForm } from "react-hook-form";
import type { CampaignTitle, Fundraising } from "src/types/typings.t";
import type { SubmitHandler } from "react-hook-form";

const CreateOrEditFundraising = () => {
  /**
   * Component States
   */
  const { is_editing_fundraising_state } = fundraising_atoms;
  const { show_create_or_edit_fundraising_modal_state } = modal_atoms;
  const [is_editing_fundraising, setIsEditingFundraising] = useRecoilState(
    is_editing_fundraising_state
  );
  const setShowCreateOrEditFundraisingModal = useSetRecoilState(
    show_create_or_edit_fundraising_modal_state
  );
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Fundraising>();
  const [selected_campaign, setSelectedCampaign] = useState({
    name: "education",
    value: "education",
  });

  const options: { name: string; value: string }[] = [
    { name: "education", value: "education" },
    { name: "environment", value: "environment" },
    { name: "humanity", value: "humanity" },
    { name: "medical", value: "medical" },
    { name: "natural disaster", value: "natural disaster" },
  ];

  /**
   * Component Functions
   */
  const onSubmit: SubmitHandler<Fundraising> = ({
    title,
    description,
    donated_amount,
    target_donation_amount,
  }) => {
    console.log(title, description, donated_amount, target_donation_amount);
  };

  return (
    <section>
      {/* Header */}
      <section>
        <ModalHeader
          close={() => {
            setIsEditingFundraising(false);
            setShowCreateOrEditFundraisingModal(false);
          }}
          is_editing={is_editing_fundraising}
          edit_title="Editing Fundraising."
          create_title="Creating A Fundraising."
        />
      </section>

      {/* Body */}
      <form className="space-y-1 px-2 py-2" onSubmit={handleSubmit(onSubmit)}>
        <section className="flex h-[14.5rem] flex-col gap-4 overflow-y-scroll py-3 scrollbar-hide sm:grid sm:h-[12rem] sm:grid-cols-2 sm:items-center sm:gap-x-4 sm:gap-y-0">
          <div className="relative">
            <input
              type="text"
              className="input peer"
              placeholder="Title"
              {...register("title", { required: true })}
            />
            <label className="input_label">Fundraising Title</label>

            {errors["title"] && (
              <Error error_message="Fundraising Title Required." />
            )}
          </div>

          <div className="relative">
            <textarea
              {...register("description", { required: true, maxLength: 150 })}
              className="input peer"
              placeholder="Description"
              rows={1}
            />
            <label className="input_label">Fundraising Description</label>

            {errors["description"] && (
              <Error error_message="Fundraising Description Required." />
            )}
          </div>

          <div>
            <Select
              multiple={false}
              options={options}
              select_wrapper_styles="bg-gray/30 rounded-[0.9rem] py-2 w-full"
              select_panel_styles="max-h-[10rem] bg-white border border-dark shadow-md"
              selected={selected_campaign}
              setSelected={setSelectedCampaign}
            />
          </div>
          <div className="relative">
            <input
              type="text"
              className="input peer"
              placeholder="amount"
              {...register("target_donation_amount", { required: true })}
            />
            <label className="input_label">Fundraising Target Amount</label>

            {errors["target_donation_amount"] && (
              <Error error_message="Fundraising Target Amount Required." />
            )}
          </div>
        </section>

        <div className="flex justify-end">
          <Button title="Create" intent="primary_yellow" />
        </div>
      </form>
    </section>
  );
};

export default CreateOrEditFundraising;
