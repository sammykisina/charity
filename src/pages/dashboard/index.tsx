import { SpinnerLoader } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

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

  console.log("status", status);

  return (
    <section>
      {status === "loading" ? (
        <div className="flex h-[25rem] items-center justify-center">
          <SpinnerLoader />
        </div>
      ) : (
        <section>{session.user?.role === "ORGANIZATION"}</section>
      )}
    </section>
  );
};

export default Dashboard;
