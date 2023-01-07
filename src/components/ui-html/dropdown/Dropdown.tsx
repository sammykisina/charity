import { type FC, type ReactNode, useRef } from "react";
import { Icon } from "@/components";
import { type SetterOrUpdater } from "recoil";
import { useClickOutside } from "@/hooks";
import { useSession } from "next-auth/react";
import { queries } from "@/utils";

interface DropdownProps {
  icon: ReactNode;
  dropdown_component: ReactNode;
  display_state: boolean;
  setDisplayState: SetterOrUpdater<boolean>;
  badge?: number;
}

const Dropdown: FC<DropdownProps> = ({
  icon,
  dropdown_component,
  display_state,
  setDisplayState,
  badge,
}) => {
  /**
   * Component States
   */
  const dropdown_component_ref = useRef<HTMLDivElement>(null);

  /**
   * Component Functions
   */
  useClickOutside(dropdown_component_ref, () => setDisplayState(false));

  return (
    <div className="relative z-40" ref={dropdown_component_ref}>
      <div className="group relative">
        <Icon
          icon={icon}
          icon_wrapper_styles={`relative p-2 z-30 topnav_bar_icon ${
            display_state && "bg-dark text-white"
          }`}
          purpose={() => setDisplayState((prev) => !prev)}
        />

        {badge
          ? badge > 0 && (
              <div className="absolute -top-1 right-0 z-30 flex h-[20px] w-[20px] items-center justify-center rounded-full  bg-dark p-2  text-sm text-white duration-300 group-hover:bg-white group-hover:text-dark">
                {badge}
              </div>
            )
          : ""}
      </div>

      <div
        className={` ${
          display_state ? "dropdown_content active" : "dropdown_content"
        }`}
      >
        {dropdown_component}
      </div>
    </div>
  );
};

export default Dropdown;
