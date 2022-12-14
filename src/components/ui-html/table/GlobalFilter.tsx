import React, { type FC, useState } from "react";
import { Icon } from "@/components";
import { RiSearch2Line } from "react-icons/ri";
import { useAsyncDebounce } from "react-table";

interface GlobalFilterProps {
  pre_global_filtered_rows: [];
  global_filter: string;
  setGlobalFilter: (value: string | undefined) => void;
}

const GlobalFilter: FC<GlobalFilterProps> = ({
  pre_global_filtered_rows,
  global_filter,
  setGlobalFilter,
}) => {
  const count = pre_global_filtered_rows.length;
  const [value, setValue] = useState<string | undefined>(global_filter);
  const onChange = useAsyncDebounce((value: string | undefined) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <label className="flex items-baseline gap-x-2">
      <div className="flex w-[200px] items-center  rounded-xl bg-gray/30 px-3">
        <Icon
          icon={<RiSearch2Line className="h-5 w-5" />}
          icon_wrapper_styles=" text-dark"
        />
        <input
          type="text"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records`}
          className="text-gra-900 w-full bg-transparent px-1 py-2 outline-none"
        />
      </div>
    </label>
  );
};

export default GlobalFilter;
