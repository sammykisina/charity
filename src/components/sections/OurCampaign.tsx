import { useRef, useState } from "react";
import { Campaign, Icon, ScrollableCampaignRow } from "@/components";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import {
  campaignImageFour,
  campaignImageOne,
  campaignImageThree,
  campaignImageTwo,
} from "@/assets";
import { Campaign as CampaignType } from "src/types/typings.t";

const OurCampaign = () => {
  /**
   * Section States
   */
  const scrollable_row_ref = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState<boolean>(false);

  const data: CampaignType[] = [
    {
      title: "help them smile again",
      description:
        "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,",
      image: campaignImageOne,
      target_donation_amount: 32050,
      donated_amount: 1000,
    },
    {
      title: "help them be happy again",
      description:
        "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,",
      image: campaignImageTwo,
      target_donation_amount: 47000,
      donated_amount: 6000,
    },
    {
      title: "Help them survive from disaster",
      description:
        "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,",
      image: campaignImageThree,
      target_donation_amount: 86500,
      donated_amount: 40000,
    },
    {
      title: "Pandemic Emergency Help",
      description:
        "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,",
      image: campaignImageFour,
      target_donation_amount: 52650,
      donated_amount: 450000,
    },
  ];

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
        <ScrollableCampaignRow
          data={data}
          scrollable_row_ref={scrollable_row_ref}
        />
      </div>
    </section>
  );
};

export default OurCampaign;
