import { useRef, useState } from "react";
import { Icon, ScrollableFundraisingRow } from "@/components";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { fundraisings } from "@/constants";

const OurFundraising = () => {
  /**
   * Section States
   */
  const scrollable_row_ref = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState<boolean>(false);

  /**
   * Component Functions
   */
  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (scrollable_row_ref.current) {
      const { scrollLeft, clientWidth } = scrollable_row_ref.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      scrollable_row_ref.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mt-[8rem]">
      <div className="flex items-center justify-between px-4">
        {/* Title */}
        <h2 className="font-noto text-[2rem] font-semibold uppercase text-dark/80">
          OUR CAMPAIGN
        </h2>

        <div className="flex">
          <Icon
            icon={<AiOutlineArrowLeft />}
            icon_wrapper_styles={`text-[1rem] hover:bg-dark hover:text-white rounded-full  ${
              !isMoved && "text-dark/40 "
            }`}
            purpose={() => handleClick("left")}
          />
          <Icon
            icon={<AiOutlineArrowRight />}
            icon_wrapper_styles={`text-[1rem] hover:bg-dark hover:text-white rounded-full`}
            purpose={() => handleClick("right")}
          />
        </div>
      </div>

      {/* The Scrollable Row */}
      <div className="px-4">
        <ScrollableFundraisingRow
          fundraisings={fundraisings}
          scrollable_row_ref={scrollable_row_ref}
        />
      </div>
    </section>
  );
};

export default OurFundraising;
