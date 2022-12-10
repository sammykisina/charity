import {
  DonorDashboard,
  OrganizationDashboard,
  SpinnerLoader,
} from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { SelectionOption } from "src/types/typings.t";

const Dashboard = () => {
  /**
   * Pages States
   */
  const { push } = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      push("auth/signin");
    },
  });

  // const option: SelectionOption = { name: "come", value: "came" };

  // console.log("type", typeof option);

  return (
    <section>
      {status === "loading" ? (
        <div className="flex h-[25rem] items-center justify-center">
          <SpinnerLoader />
        </div>
      ) : (
        <section>
          {session.user?.role === "ORGANIZATION" ? (
            <OrganizationDashboard />
          ) : (
            <DonorDashboard />
          )}
        </section>
      )}
    </section>
  );
};

export default Dashboard;
