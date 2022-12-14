import React, { useEffect, useMemo, useState } from "react";
import { Select } from "@/components";

const Filter = ({
  label,
  column: { id, preFilteredRows, setFilter },
}: {
  label: string;
  column: {
    setFilter: any;
    preFilteredRows: any;
    id: any;
  };
}) => {
  /**
   * Component States
   */
  const [selected, setSelected] = useState<string>(label);

  /**
   * Creating The Filter Options Using The perFilteredRows
   */
  const options = useMemo(() => {
    const options = new Set();
    options.add("All");

    preFilteredRows?.forEach((row: any) => {
      row.values[id] && options.add(row.values[id]);
    });

    return [...options.values()] as string[];
  }, [id, preFilteredRows]);

  /**
   * Set The Current Filter Value
   */
  useEffect(() => {
    setFilter(selected === "All" ? "" : selected);
  }, [selected]);

  return (
    <Select
      multiple={false}
      options={options}
      select_wrapper_styles="bg-gray/30 rounded-[0.9rem] py-1 w-[10rem]"
      select_panel_styles="max-h-[10rem] bg-white border border-dark shadow-md"
      selected={selected}
      setSelected={setSelected}
    />
  );
};

export default Filter;
