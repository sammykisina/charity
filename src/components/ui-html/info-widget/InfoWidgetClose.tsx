import React, { type FC } from "react";
import { Icon } from "@/components";
import { HiXMark } from "react-icons/hi2";

interface InfoWidgetCloseProps {
  close: () => void;
}

const InfoWidgetClose: FC<InfoWidgetCloseProps> = ({ close }) => {
  return (
    <Icon
      icon={<HiXMark className={`h-5 w-5 text-white`} />}
      purpose={close}
      icon_wrapper_styles="p-1 w-fit h-fit  rounded-full flex justify-center items-center z-50 bg-red-300 hover:bg-red-500"
    />
  );
};

export default InfoWidgetClose;
