import type { FC, RefObject } from "react";
import type { Campaign as CampaignType } from "src/types/typings.t";
import { Campaign } from "@/components";

interface ScrollableCampaignRowProps {
  data: CampaignType[];
  scrollable_row_ref: RefObject<HTMLDivElement>;
}

const ScrollableCampaignRow: FC<ScrollableCampaignRowProps> = ({
  data,
  scrollable_row_ref,
}) => {
  return (
    <section>
      <div
        ref={scrollable_row_ref}
        className="flex gap-3 overflow-x-scroll py-2 scrollbar-hide"
      >
        {data?.map((single_data, single_data_index) => (
          <div key={single_data_index}>
            {<Campaign campaign={single_data} />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScrollableCampaignRow;
