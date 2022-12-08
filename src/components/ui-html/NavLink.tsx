import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { FC } from "react";
import { useSetRecoilState } from "recoil";
import { showSidebarState } from "src/atoms/AppAtom";
import useDetectScroll from "src/hooks/useDetectScroll";
import { type Route } from "src/types/typings.t";

const navlink_styles = cva(
  "flex items-center rounded-full hover:bg-light  focus:outline-none w-fit px-4 py-2 text-white gap-3 duration-300",
  {
    variants: {
      type: {
        small: "h-[38px] gap-[6px] text-[14px]",
        medium: "h-[40px] gap-[8px] px-[16px] text-[16px]",
        large: "h-[56px] gap-[8px] px-[20px] text-[18px]",
      },
      full_width: {
        true: "w-full",
      },
      active: {
        true: "bg-light",
      },
    },
  }
);

interface NavLinkProps extends VariantProps<typeof navlink_styles> {
  route: Route;
}

const NavLink: FC<NavLinkProps> = ({ full_width, type, route, active }) => {
  /**
   * Component States
   */
  const setShowSidebar = useSetRecoilState(showSidebarState);

  return (
    <Link href={route.to} onClick={() => setShowSidebar(false)}>
      <div className={navlink_styles({ full_width, type, active })}>
        <div className={`${active && "text-white/50 duration-300"}`}>
          {active ? route.active_icon : route.inactive_icon}
        </div>

        <span> {route.name}</span>
      </div>
    </Link>
  );
};

export default NavLink;
