import {
  educationImage,
  environmentImage,
  humanityImage,
  medicalImage,
  naturalDisasterImage,
} from "@/assets";
import { BsVectorPen } from "react-icons/bs";
import { HiEmojiHappy } from "react-icons/hi";
import { FiCloudRain, FiFeather } from "react-icons/fi";
import { TbActivityHeartbeat } from "react-icons/tb";
import { type Campaign } from "src/types/typings.t";

const Campaigns: Campaign[] = [
  {
    id: "humanity",
    image: humanityImage,
    title: "humanity",
    description:
      "Lorem ipsum dolor sit amet. Non tempora consequatur ab fugiat illum ut ratione amet in libero ",
    icon: <HiEmojiHappy />,
  },
  {
    id: "education",
    image: educationImage,
    title: "education",
    description:
      "Eum libero nisi non libero mollitia sed excepturi architecto aut rerum nesciunt et adipisci q",
    icon: <BsVectorPen className="rotate-[90deg]" />,
  },
  {
    id: "medical",
    image: medicalImage,
    title: "medical",
    description:
      "maxime distinctio et suscipit atque qui aliquid animi quo minima consequatur.",
    icon: <TbActivityHeartbeat />,
  },
  {
    id: "natural_disaster",
    image: naturalDisasterImage,
    title: "natural disaster",
    description:
      "t nihil earum qui distinctio suscipit et sint voluptate qui autem voluptatem eum",
    icon: <FiCloudRain />,
  },
  {
    id: "environment",
    image: environmentImage,
    title: "environment",
    description:
      "Et magnam quidem qui fugit magnam eos minima odio eum veniam labore eum ",
    icon: <FiFeather />,
  },
];

export default Campaigns;
