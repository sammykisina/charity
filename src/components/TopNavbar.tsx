import React, { useState } from "react";
import {
  Icon,
  Logo,
  Button,
  Dropdown,
  Profile,
  Notifications,
  Messages,
} from "@/components";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { useSetRecoilState } from "recoil";
import { showSidebarState } from "src/atoms/AppAtom";
import { signIn, useSession } from "next-auth/react";
import {
  HiOutlineBell,
  HiOutlineEnvelope,
  HiOutlineUser,
} from "react-icons/hi2";

const TopNavBar = () => {
  /**
   * Component States
   */
  const setShowSidebar = useSetRecoilState(showSidebarState);
  const { data: session } = useSession();
  const [show_profile_dropdown, setShowProfileDropdown] =
    useState<boolean>(false);
  const [show_notification_dropdown, setShowNotificationDropdown] =
    useState<boolean>(false);
  const [show_messages_dropdown, setShowMessagesDropdown] =
    useState<boolean>(false);

  return (
    <header className="flex items-center justify-between  p-4 sm:ml-[220px] ">
      <div className="flex items-center gap-3">
        {/* Menu */}
        <div>
          <Icon
            icon={<HiOutlineMenuAlt4 />}
            icon_wrapper_styles="text-[1.5rem] text-dark/50 hover:bg-dark hover:text-white rounded-full duration-300 sm:hidden"
            purpose={() => setShowSidebar(true)}
          />
        </div>
        {/* Logo */}
        <Logo logo_styles="text-dark sm:hidden" />
      </div>

      <div className="flex items-center  gap-4">
        {!session && (
          <Button
            title="Sign Up"
            intent="link"
            purpose={() => signIn()}
            type="medium"
          />
        )}

        {session ? (
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-1">
              <Dropdown
                icon={<HiOutlineBell />}
                dropdown_component={<Notifications />}
                display_state={show_notification_dropdown}
                setDisplayState={setShowNotificationDropdown}
              />

              <Dropdown
                icon={<HiOutlineEnvelope />}
                dropdown_component={<Messages />}
                display_state={show_messages_dropdown}
                setDisplayState={setShowMessagesDropdown}
              />
            </div>

            <Dropdown
              icon={<HiOutlineUser />}
              dropdown_component={<Profile />}
              display_state={show_profile_dropdown}
              setDisplayState={setShowProfileDropdown}
            />
          </div>
        ) : (
          <Button title="Login" purpose={() => signIn()} type="medium" />
        )}
      </div>
    </header>
  );
};

export default TopNavBar;
