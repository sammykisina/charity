import type { ReactNode } from "react";
import {
  CreateOrEditFundraising,
  DeleteFundraising,
  FundraisingInfo,
  InfoWidget,
  Modal,
  Sidebar,
  TopNavbar,
} from "@/components";
import { useRecoilValue } from "recoil";
import { showSidebarState } from "src/atoms/AppAtom";
import { modal_atoms, info_widget_atoms } from "@/atoms";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: { children: ReactNode }) => {
  /**
   * Component States
   */
  // Modal States
  const {
    show_create_or_edit_fundraising_modal_state,
    show_delete_fundraising_modal_state,
  } = modal_atoms;
  const show_sidebar = useRecoilValue(showSidebarState);
  const show_create_or_edit_fundraising_modal = useRecoilValue(
    show_create_or_edit_fundraising_modal_state
  );
  const show_delete_fundraising_modal = useRecoilValue(
    show_delete_fundraising_modal_state
  );

  // Widget States
  const { show_info_widget_state } = info_widget_atoms;
  const show_info_widget = useRecoilValue(show_info_widget_state);

  return (
    <section className="mx-auto max-w-[1200px] sm:px-[20px]">
      {/* TopNavbar */}
      <div>
        <div>
          <div
            className={`absolute w-[220px] duration-300 sm:left-0 lg:flex-1 xl:ml-[60px]  2xl:ml-[160px] ${
              show_sidebar ? "left-0" : "-left-[100%]"
            }`}
          >
            {/* The Toaster */}
            <Toaster />
            <Sidebar />
          </div>
          <TopNavbar />
        </div>

        {/* The Main */}
        <main className="h-[45rem] overflow-y-scroll  scrollbar-hide  xs:h-[39.5rem] sm:ml-[220px] xl:h-[39.5rem]">
          {children}
        </main>
      </div>

      {/* Modals */}
      <Modal
        modal_state={show_create_or_edit_fundraising_modal}
        modal_styles="w-[90vw] h-[24rem] sm:h-[21.5rem] duration-300"
        component={<CreateOrEditFundraising />}
      />

      <Modal
        modal_state={show_delete_fundraising_modal}
        modal_styles="w-[90vw] h-[13.5rem] duration-300"
        component={<DeleteFundraising />}
      />

      {/* Info Widget */}
      <InfoWidget
        widget_state={show_info_widget}
        component={<FundraisingInfo />}
        widget_styles="w-[90vw] h-screen"
      />
    </section>
  );
};

export default Layout;
