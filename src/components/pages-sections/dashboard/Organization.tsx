import React, { useState } from "react";
import { Select } from "@/components";
import { type SelectionOption } from "src/types/typings.t";

const Organization = () => {
  /**
   * Organization
   */
  const period_options: SelectionOption[] = [
    { name: "This Month", value: "this month" },
    { name: "Last Month", value: "last month" },
    { name: "This Year", value: "this Year" },
    { name: "Last Year", value: "ast Year" },
  ];
  const [selected_period, setSelectedPeriod] = useState<SelectionOption>(
    period_options[0] || { name: "", value: "" }
  );

  return (
    <section className="px-4">
      {/* Period Select */}

      <Select
        multiple={false}
        options={period_options}
        select_wrapper_styles="bg-white rounded-[0.9rem] py-4  w-[10rem]"
        select_panel_styles="max-h-[10rem] bg-white"
        selected={selected_period}
        setSelected={setSelectedPeriod}
      />
    </section>
  );
};

export default Organization;
