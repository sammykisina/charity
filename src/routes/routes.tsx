import {
  HiSquares2X2,
  HiOutlineSquares2X2,
  HiHome,
  HiOutlineHome,
  HiSquare2Stack,
  HiOutlineSquare2Stack,
  HiCalendarDays,
  HiOutlineCalendarDays,
  HiChartPie,
  HiDocumentText,
  HiCog6Tooth,
  HiOutlineCog6Tooth,
  HiOutlineChartPie,
  HiOutlineDocumentText,
  HiBell,
  HiOutlineBell,
} from "react-icons/hi2";
import { type Route } from "src/types/typings.t";

const routes: Route[] = [
  {
    name: "Home",
    inactive_icon: <HiOutlineHome className="route_icon" />,
    active_icon: <HiHome className="route_icon" />,
    to: "/",
  },
  {
    name: "Dashboard",
    inactive_icon: <HiOutlineSquares2X2 className="route_icon" />,
    active_icon: <HiSquares2X2 className="route_icon" />,
    to: "/dashboard",
  },
  {
    name: "Fundraising",
    inactive_icon: <HiOutlineSquare2Stack className="route_icon" />,
    active_icon: <HiSquare2Stack className="route_icon" />,
    to: "/fundraising",
  },
  {
    name: "Events",
    inactive_icon: <HiOutlineCalendarDays className="route_icon" />,
    active_icon: <HiCalendarDays className="route_icon" />,
    to: "/events",
  },
  {
    name: "Notifications",
    inactive_icon: <HiOutlineBell className="route_icon" />,
    active_icon: <HiBell className="route_icon" />,
    to: "/notifications",
  },
  {
    name: "Campaign",
    inactive_icon: <HiOutlineChartPie className="route_icon" />,
    active_icon: <HiChartPie className="route_icon" />,
    to: "/campaign",
  },
  {
    name: "Documents",
    inactive_icon: <HiOutlineDocumentText className="route_icon" />,
    active_icon: <HiDocumentText className="route_icon" />,
    to: "/documents",
  },
  {
    name: "Settings",
    inactive_icon: <HiOutlineCog6Tooth className="route_icon" />,
    active_icon: <HiCog6Tooth className="route_icon" />,
    to: "/settings",
  },
];

export default routes;
