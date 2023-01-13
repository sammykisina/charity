import { useRef } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { useSetRecoilState } from "recoil";
import { useClickOutside } from "@/hooks";
import { showSidebarState } from "src/atoms/AppAtom";
import { Button, Icon, Logo, NavLink, Title } from "@/components";
import { useSession, signOut } from "next-auth/react";
import { routes } from "@/routes";
import { useRouter } from "next/router";

const Sidebar = () => {
  /**
   * Component States
   */
  const setShowSidebar = useSetRecoilState(showSidebarState);
  const sidebar_ref = useRef<HTMLElement>(null);
  const { data: session } = useSession();
  const router = useRouter();

  /**
   * Component Functions
   */
  useClickOutside(sidebar_ref, () => setShowSidebar(false));

  return (
    <aside
      className="relative z-40 flex h-screen flex-col justify-between bg-dark p-4 pt-[2.8rem] duration-300"
      ref={sidebar_ref}
    >
      <Icon
        icon={<HiChevronLeft className="h-6 w-6" />}
        icon_wrapper_styles="absolute cursor-pointer -right-[18px] top-[45px] rounded-full flex justify-center items-center z-50 bg-dark text-white sm:hidden"
        purpose={() => setShowSidebar(false)}
      />
      <div>
        {/* Logo */}
        <div className="flex flex-1 flex-col items-center">
          {/* <Title title="Sam" title_styles="text-white " /> */}
          <Logo logo_styles="text-white" extra_styles="bg-white" />

          <div className="mt-2 flex gap-2">
            <span className="items-center whitespace-nowrap text-sm text-white/40">
              Verified Foundation
            </span>
            <Icon
              icon={<MdVerified className="h-5 w-5 text-green-500" />}
              purpose={() => setShowSidebar(false)}
            />
          </div>
        </div>

        {/* Links */}
        <div className="mt-6 flex flex-col gap-4">
          {routes.map((route, route_index) => (
            <NavLink
              key={route_index}
              route={route}
              type="medium"
              full_width={true}
              active={router?.pathname === route.to && true}
            />
          ))}
        </div>
      </div>

      {session && (
        <Button
          icon={<TbLogout />}
          title="Log Out"
          purpose={() => {
            signOut();
          }}
          type="large"
          intent="secondary"
          full_width={true}
        />
      )}
    </aside>
  );
};

export default Sidebar;
