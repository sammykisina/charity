import {
  DonorFundraising,
  OrganizationFundraising,
  SpinnerLoader,
} from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const Fundraising = () => {
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

  return (
    <section>
      {status === "loading" ? (
        <div className="flex h-[25rem] items-center justify-center ">
          <div className="rounded-full border bg-dark p-4">
            <SpinnerLoader color="fill-white" />
          </div>
        </div>
      ) : (
        <section className="h-fit">
          {session?.user?.role === "ORGANIZATION" ? (
            <OrganizationFundraising />
          ) : (
            <DonorFundraising />
          )}
        </section>
      )}
    </section>
  );
};

export default Fundraising;
