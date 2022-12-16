import React, { type FC } from "react";
import { InfoWidgetClose, Title } from "@/components";

interface InfoWidgetHeader {
  close: () => void;
  title: string;
  title_styles?: string;
}

const InfoWidgetHeader: FC<InfoWidgetHeader> = ({
  close,
  title,
  title_styles,
}) => {
  return (
    <section className="space-y-2  py-1 px-4">
      <InfoWidgetClose close={close} />

      <Title
        title={title}
        title_styles={title_styles ? title_styles : "text-gray-900 uppercase"}
      />

      <div className="h-[0.3rem] w-full rounded-full bg-yellow/20" />
    </section>
  );
};

export default InfoWidgetHeader;
