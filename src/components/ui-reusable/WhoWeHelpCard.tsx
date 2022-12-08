import type { FC, Dispatch, SetStateAction } from "react";
import type { WhoWeHelp } from "src/types/typings.t";
import { motion } from "framer-motion";
import { fadeIn } from "src/utils/motion";
import { Icon, Button } from "@/components";
import Image from "next/image";

interface WhoWeHelpCardProps {
  who_we_help: WhoWeHelp;
  index: number;
  active_who_we_help: string;
  setActiveWhoWeHelp: Dispatch<SetStateAction<string>>;
}

const WhoWeHelpCard: FC<WhoWeHelpCardProps> = ({
  who_we_help: { title, id, description, icon, image },
  index,
  active_who_we_help,
  setActiveWhoWeHelp,
}) => {
  return (
    <motion.section
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className={`relative rounded-[3rem] ${
        active_who_we_help === id
          ? "flex-[8] lg:flex-[3.5]"
          : "relative flex-[2] bg-dark lg:flex-[0.5]"
      } ease-out-flex  cursor-pointer justify-center transition-[flex] duration-[0.7s]`}
      onClick={() => setActiveWhoWeHelp(id)}
    >
      {active_who_we_help !== id ? (
        <div className="absolute z-0  flex h-full w-full items-center justify-center border text-[3rem] font-semibold text-white">
          <Icon icon={icon} icon_wrapper_styles="text-yellow/80" />
        </div>
      ) : (
        <div className="flex flex-col gap-6 px-4">
          {/* Title */}
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <Icon
                icon={icon}
                icon_wrapper_styles="text-yellow/80 text-[2rem]"
              />
              <span className="font-bold uppercase text-dark/80">{title}</span>
            </div>
            <div className="h-[0.1rem] flex-1 bg-gray" />
          </div>

          {/* Description */}
          <p className="font-nunito text-dark/50 first-letter:capitalize">
            {description}
          </p>

          {/* Donation Btn */}
          <Button title="Donate Now" type="medium" />

          {/* Image */}
          <div>
            <Image
              src={image}
              alt="title"
              className="h-[15.5rem] w-full rounded-[2rem] object-cover "
            />
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default WhoWeHelpCard;
