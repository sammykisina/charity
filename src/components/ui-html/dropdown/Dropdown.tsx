import { type FC, type ReactNode, useRef } from "react";
import { Icon } from "@/components";
import { type SetterOrUpdater } from "recoil";
import { useClickOutside } from "@/hooks";

interface DropdownProps {
  icon: ReactNode;
  dropdown_component: ReactNode;
  display_state: boolean;
  setDisplayState: SetterOrUpdater<boolean>;
}

const Dropdown: FC<DropdownProps> = ({
  icon,
  dropdown_component,
  display_state,
  setDisplayState,
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
      <Icon
        icon={icon}
        icon_wrapper_styles={`relative p-2 z-30 topnav_bar_icon ${
          display_state && "bg-dark text-white"
        }`}
        purpose={() => setDisplayState((prev) => !prev)}
      />

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
