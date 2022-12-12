import type { ReactNode } from "react";
import { Footer, Sidebar, TopNavbar } from "@/components";
import { useRecoilValue } from "recoil";
import { showSidebarState } from "src/atoms/AppAtom";
import { useSession } from "next-auth/react";

const Layout = ({ children }: { children: ReactNode }) => {
  /**
   * Component States
   */
  const show_sidebar = useRecoilValue(showSidebarState);

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
            <Sidebar />
          </div>
          <TopNavbar />
        </div>

        {/* The Main */}
        <main className="sm:ml-[220px]">{children}</main>
      </div>

      {/* Lower Nav Bar */}
      {/* <div>
        <Footer />
      </div> */}
    </section>
  );
};

export default Layout;
