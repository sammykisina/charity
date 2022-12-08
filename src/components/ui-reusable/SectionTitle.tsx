import type { FC } from "react";

interface SectionTitleProps {
  title: string;
  section_title_wrapper_styles: string;
}

const SectionTitle: FC<SectionTitleProps> = ({
  title,
  section_title_wrapper_styles,
}) => {
  return (
    <div className={`${section_title_wrapper_styles}`}>
      <h2 className="font-noto text-[1.4rem]  font-semibold uppercase text-dark/80 lg:text-[2rem]">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
