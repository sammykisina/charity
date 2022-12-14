import type { FC } from "react";
import { ModalClose, Title } from "@/components";

interface ModalHeaderProps {
  close: () => void;
  create_title: string;
  edit_title: string;
  is_editing: boolean;
  title_styles?: string;
}

const ModalHeader: FC<ModalHeaderProps> = ({
  close,
  create_title,
  edit_title,
  is_editing,
  title_styles,
}) => {
  return (
    <section className="space-y-2  py-1 px-4">
      <ModalClose close={close} />

      <Title
        title={is_editing ? edit_title : create_title}
        title_styles={title_styles ? title_styles : "text-gray-900 uppercase"}
      />

      <div className="h-[0.3rem] w-full rounded-full bg-gray" />
    </section>
  );
};

export default ModalHeader;
