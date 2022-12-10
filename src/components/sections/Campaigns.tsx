import { useState } from "react";
import { motion } from "framer-motion";
import { campaigns } from "@/constants";
import { CampaignCard, SectionTitle } from "@/components";

const WhoDoWeHelp = () => {
  /**
   * Section States
   */
  const [active_campaign, setActiveCampaign] = useState<string>("humanity");

  return (
    <section className="mt-[7rem]">
      {/* Title */}
      <SectionTitle
        title="Who Do We Help"
        section_title_wrapper_styles="flex justify-center"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
        className="w-full"
      >
        <div className="mt-[1rem] flex h-[60rem] flex-col gap-1  px-4 lg:h-[30rem]  lg:flex-row ">
          {campaigns.map((campaign, campaign_index) => (
            <CampaignCard
              key={campaign_index}
              index={campaign_index}
              active_campaign={active_campaign}
              setActiveCampaign={setActiveCampaign}
              campaign={campaign}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WhoDoWeHelp;
