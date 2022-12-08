import { useState } from "react";
import { motion } from "framer-motion";
import { whoWeHelpData } from "@/constants";
import { SectionTitle, WhoWeHelpCard } from "@/components";

const WhoDoWeHelp = () => {
  /**
   * Section States
   */
  const [active_who_we_help, setActiveWhoWeHelp] = useState<string>("humanity");

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
          {whoWeHelpData.map((who_we_help, who_we_help_index) => (
            <WhoWeHelpCard
              key={who_we_help_index}
              index={who_we_help_index}
              active_who_we_help={active_who_we_help}
              setActiveWhoWeHelp={setActiveWhoWeHelp}
              who_we_help={who_we_help}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WhoDoWeHelp;
