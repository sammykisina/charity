import { app_atoms } from "@/atoms";
import type { Dispatch, FC, ReactNode } from "react";
import { useRecoilValue } from "recoil";

type InfoWidgetProps = {
  component: ReactNode;
  widget_state: boolean;
  widget_styles: string;
};

const InfoWidget: FC<InfoWidgetProps> = ({
  component,
  widget_state,
  widget_styles,
}) => {
  /**
   * Component States
   */
  // const { show_info_widget_state } = app_atoms;
  // const show_info_widget = useRecoilValue(show_info_widget_state);

  return (
    <aside
      className={`${widget_state ? "info-wrapper show " : "info-wrapper"} `}
    >
      <div className={`info ${widget_styles} flex flex-col gap-y-4 py-5`}>
        {component}
      </div>
    </aside>
  );
};

export default InfoWidget;
