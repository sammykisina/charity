import type { FC, RefObject } from "react";
import type { Fundraising as FundraisingType } from "src/types/typings.t";
import { Fundraising } from "@/components";

interface ScrollableCampaignRowProps {
  fundraisings: FundraisingType[];
  scrollable_row_ref: RefObject<HTMLDivElement>;
}

const ScrollableFundraisingRow: FC<ScrollableCampaignRowProps> = ({
  fundraisings,
  scrollable_row_ref,
}) => {
  return (
    <section>
      <div
        ref={scrollable_row_ref}
        className="flex gap-3 overflow-x-scroll py-2 scrollbar-hide"
      >
        {fundraisings?.map((single_fundraising, single_fundraising_index) => (
          <div key={single_fundraising_index}>
            {<Fundraising fundraising={single_fundraising} />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScrollableFundraisingRow;
