import { AiFillHome, AiFillPhone } from "react-icons/ai";
import { BsFillShieldFill } from "react-icons/bs";
import { FaDonate } from "react-icons/fa";
import { SiCampaignmonitor } from "react-icons/si";
import type { Route } from "src/types/typings.t";

const unauthenticated_navlinks: Route[] = [
  {
    icon: <AiFillHome />,
    name: "Home",
    to: "hero",
  },
  // {
  //   icon: <SiCampaignmonitor />,
  //   name: "Campaign",
  //   to: "campaign",
  // },
  // {
  //   icon: <BsFillShieldFill />,
  //   name: "About Us",
  //   to: "about_us",
  // },
  // {
  //   icon: <AiFillPhone />,
  //   name: "Contact Us",
  //   to: "contact_us",
  // },
  // {
  //   icon: <FaDonate />,
  //   name: "Donation",
  //   to: "donation",
  // },
];

export default unauthenticated_navlinks;
