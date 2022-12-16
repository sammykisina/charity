import { useRef } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { useSetRecoilState } from "recoil";
import { useClickOutside } from "@/hooks";
import { showSidebarState } from "src/atoms/AppAtom";
import { Button, Icon, Logo, NavLink } from "@/components";
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
      className="relative z-40 flex h-screen flex-col justify-between bg-dark p-4 pt-[3.1rem] duration-300"
      ref={sidebar_ref}
    >
      <Icon
        icon={<HiChevronLeft className="h-6 w-6" />}
        icon_wrapper_styles="absolute cursor-pointer -right-[18px] top-[45px] rounded-full flex justify-center items-center z-50 bg-dark text-white sm:hidden"
        purpose={() => setShowSidebar(false)}
      />
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border border-white">
            <Logo logo_styles="text-white " />
          </div>

          <div className=" flex flex-1 flex-col">
            <div className="flex items-center whitespace-normal text-sm">
              <span className="text-white">Sam Donation</span>
              <Icon
                icon={<MdVerified className="h-4 w-5 text-green-500" />}
                purpose={() => setShowSidebar(false)}
              />
            </div>
            <span className="text-sm text-white/40">Verified Foundation</span>
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
